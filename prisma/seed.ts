import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();
async function main() {
  const adminEmail = process.env.ADMIN_EMAIL!; const adminPassword = process.env.ADMIN_PASSWORD!;
  const passwordHash = await bcrypt.hash(adminPassword, 10);
  await prisma.user.upsert({ where: { email: adminEmail }, update: { password: passwordHash, role: "ADMIN" }, create: { email: adminEmail, password: passwordHash, role: "ADMIN", name: "Admin" } });
  const demo = [
    { title: "Minimal Leather Tote", description: "Clean silhouette, everyday carry.", price: 450000, imageUrl: "/placeholder.png" },
    { title: "Wireless On-Ear Headphones", description: "Lightweight, 30h battery, BT 5.3.", price: 320000, imageUrl: "/placeholder.png" },
    { title: "Ceramic Mug  Matte", description: "12oz, heat-retaining ceramic.", price: 65000, imageUrl: "/placeholder.png" }
  ];
  for (const p of demo) { await prisma.product.upsert({ where: { title: p.title }, update: p, create: p }); }
  console.log("Seed completed ");
}
main().finally(() => prisma.$disconnect());