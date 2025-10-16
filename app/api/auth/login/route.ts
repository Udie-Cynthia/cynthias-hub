import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { loginSchema } from "@/lib/validators";
import bcrypt from "bcryptjs";
import { signJwt } from "@/lib/jwt";
export async function POST(req: Request) {
  try {
    const json = await req.json(); const data = loginSchema.parse(json);
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    const ok = await bcrypt.compare(data.password, user.password);
    if (!ok) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    const token = signJwt({ id: user.id, role: user.role, email: user.email });
    const res = NextResponse.json({ ok: true });
    res.cookies.set("chub_token", token, { httpOnly: true, secure: true, sameSite: "lax", path: "/" });
    return res;
  } catch { return NextResponse.json({ error: "Invalid input" }, { status: 400 }); }
}