import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function GET(req: Request): Promise<NextResponse> {
  try {
    const prisma = new PrismaClient();

    // Extrai os parâmetros da query string
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email"); // Obtém o e-mail da query string

    if (!email) {
      return NextResponse.json(
        { message: "Email não fornecido." },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    const id = user?.id;

    // Consulta ao banco para registros com base no e-mail
    const records = await prisma.cheklist.findMany({
      where: {
        userId: id, // Filtra pelo e-mail fornecido
      },
      orderBy: {
        date: "desc",
      },
    });
    console.log(records);
    return NextResponse.json(records);
  } catch (error) {
    console.error(`Erro ao buscar dados: ${error}`);
    return NextResponse.json(
      { message: "Erro ao buscar os dados", error: (error as Error).message },
      { status: 500 }
    );
  }
}
