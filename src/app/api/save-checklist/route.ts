import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
// Ajuste o caminho conforme sua estrutura

export async function POST(req: Request) {
  try {
    // Parseia o corpo da requisição
    const body = await req.json();
    const { water, food, exercise } = body;
    const prisma = new PrismaClient();
    if (
      typeof water !== "boolean" ||
      typeof food !== "boolean" ||
      typeof exercise !== "boolean"
    ) {
      return NextResponse.json(
        { success: false, message: "Dados inválidos" },
        { status: 400 }
      );
    }

    // Obtém a data atual para salvar no banco
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Salvar os dados no banco
    const result = await prisma.cheklist.upsert({
      where: { id: "unique-id" }, // Replace "unique-id" with the actual unique identifier
      update: {
        diet: food,
        hydration: water,
        exercise: exercise,
      },
      create: {
        date: today,
        diet: food,
        hydration: water,
        exercise: exercise,
        user: { connect: { id: "user-id" } }, // Replace "user-id" with the actual user identifier
      },
    });

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Erro ao salvar os dados:", error);
    return NextResponse.json(
      { success: false, message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
