import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const DELETE = async (request, { params }) => {
  const product = await prisma.product.delete({
    where: {
      id: Number(params.id),
    },
  });
  return NextResponse.json(product, { status: 200 });
};

export const PATCH = async (request, { params }) => {
  const body = await request.json();
  const product = await prisma.product.update({
    where: {
      id: Number(params.id),
    },
    data: {
      title: body.title,
      price: body.price,
      brandId: body.brandId,
    },
  });
  return NextResponse.json(product, { status: 200 });
};
