import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const prisma = new PrismaClient();

    // Consulta ao banco para obter todos os registros históricos
    const records = await prisma.cheklist.findMany({
      orderBy: {
        date: "asc",
      },
    });

    return NextResponse.json(records);
  } catch (error) {
    console.error(`Erro ao buscar dados: ${error} `);
    return NextResponse.json(
      { message: "Erro ao buscar os dados", error: error },
      { status: 500 }
    );
  }
}
