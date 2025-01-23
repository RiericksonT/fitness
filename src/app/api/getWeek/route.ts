import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const today = new Date();

    const prisma = new PrismaClient();

    // Consulta ao banco para obter registros da semana atual
    const records = await prisma.cheklist.findMany({
      where: {
        date: {
          gte: new Date(today.setHours(0, 0, 0, 0)),
          lte: new Date(today.setDate(today.getDate() + 6)),
        },
      },
      orderBy: {
        date: "asc",
      },
    });

    // Formatação dos dados
    const data = records.map(
      (record: {
        id: string;
        exercise: boolean;
        diet: boolean;
        hydration: boolean;
        date: Date;
        userId: string;
      }) => {
        new Date(record.date);
        return {
          exercise: record.exercise,
          diet: record.diet,
          hydration: record,
          date: record.date,
        };
      }
    );

    return NextResponse.json(data);
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    return NextResponse.json(
      { message: "Erro ao buscar os dados", error: error },
      { status: 500 }
    );
  }
}
