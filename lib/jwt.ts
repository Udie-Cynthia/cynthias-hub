import jwt from "jsonwebtoken";
const SECRET = process.env.JWT_SECRET!;
export type JwtPayload = { id: number; role: "USER" | "ADMIN"; email: string };
export function signJwt(payload: JwtPayload) { return jwt.sign(payload, SECRET, { expiresIn: "7d" }); }
export function verifyJwt(token: string) { return jwt.verify(token, SECRET) as JwtPayload; }