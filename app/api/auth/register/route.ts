import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { registerSchema } from "@/lib/validators";
import bcrypt from "bcryptjs";
export async function POST(req: Request) {
  try {
    const json = await req.json(); const data = registerSchema.parse(json);
    const exists = await prisma.user.findUnique({ where: { email: data.email } });
    if (exists) return NextResponse.json({ error: "Email in use" }, { status: 400 });
    const password = await bcrypt.hash(data.password, 10);
    await prisma.user.create({ data: { email: data.email, password, name: data.name } });
    return NextResponse.json({ ok: true });
  } catch { return NextResponse.json({ error: "Invalid input" }, { status: 400 }); }
}