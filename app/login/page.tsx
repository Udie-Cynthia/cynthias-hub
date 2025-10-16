"use client";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true);
    const res = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password })});
    setLoading(false);
    if (res.ok) window.location.href = "/"; else alert("Login failed");
  }

  return (
    <div className="max-w-sm mx-auto card p-6 space-y-3">
      <h1 className="text-2xl font-semibold">Welcome back</h1>
      <form onSubmit={submit} className="space-y-3">
        <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="input" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="btn btn-primary w-full" disabled={loading}>{loading?"Logging in...":"Log In"}</button>
      </form>
    </div>
  );
}