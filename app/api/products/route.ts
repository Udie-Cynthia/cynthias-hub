import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { productSchema } from "@/lib/validators";
import { cookies } from "next/headers";
import { verifyJwt } from "@/lib/jwt";
export async function GET() {
  const list = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(list);
}
export async function POST(req: Request) {
  const token = cookies().get("chub_token")?.value;
  try {
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const user = verifyJwt(token);
    if (user.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    const json = await req.json(); const data = productSchema.parse(json);
    const created = await prisma.product.create({ data });
    return NextResponse.json(created, { status: 201 });
  } catch { return NextResponse.json({ error: "Bad request" }, { status: 400 }); }
}