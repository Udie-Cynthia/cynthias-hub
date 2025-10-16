import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { cookies } from "next/headers";
import { verifyJwt } from "@/lib/jwt";
export async function POST(req: Request) {
  try {
    const { items } = await req.json();
    const token = cookies().get("chub_token")?.value;
    if (!token) return NextResponse.json({ error: "Login required" }, { status: 401 });
    const user = verifyJwt(token);
    const total = items.reduce((a: number, i: any) => a + i.price * i.quantity, 0);
    const order = await prisma.order.create({
      data: { userId: user.id, total, items: { create: items.map((i: any) => ({ productId: i.id, quantity: i.quantity, price: i.price })) } },
      include: { items: true },
    });
    return NextResponse.json({ ok: true, orderId: order.id });
  } catch { return NextResponse.json({ error: "Bad request" }, { status: 400 }); }
}