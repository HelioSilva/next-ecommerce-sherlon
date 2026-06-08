import { NextResponse } from "next/server";
import { Redis, s } from "@upstash/redis";

const redis = Redis.fromEnv();

type Cupom = {
  id?: string;
  cupom: string;
  desconto: number;
};

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // upstash já retorna objeto
    const cupons = (await redis.get("cupons")) as Cupom[] | null;

    // se não existir, cria array vazio
    const lista = cupons || [];

    const cupomExistente = lista.find(
      (item) =>
        item.cupom.toLocaleLowerCase() === body.cupom.toLocaleLowerCase(),
    );

    if (cupomExistente) {
      return NextResponse.json(
        {
          success: false,
          message: "Cupom já existe",
        },
        {
          status: 400,
        },
      );
    }

    const novoCupom: Cupom = {
      id: crypto.randomUUID(),
      cupom: body.cupom,
      desconto: Number(body.desconto),
    };

    // adiciona novo
    lista.push(novoCupom);

    // salva
    await redis.set("cupons", lista);

    return NextResponse.json({
      success: true,
      lista,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      },
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "ID não encontrado",
        },
        { status: 400 },
      );
    }

    const cupons = (await redis.get("cupons")) as Cupom[] | null;
    const lista = (cupons || []).filter((cupom) => cupom.id !== id);

    await redis.set("cupons", lista);

    return NextResponse.json({
      success: true,
      lista,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Erro ao deletar cupom",
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const cupons = (await redis.get("cupons")) || [];

    return NextResponse.json({
      success: true,
      cupons,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      },
    );
  }
}
