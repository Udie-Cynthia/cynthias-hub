"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "./Logo";

export default function Header() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("chub_cart") || "[]");
    setCount(cart.reduce((a: number, i: any) => a + i.quantity, 0));
    const onStorage = () => {
      const c = JSON.parse(localStorage.getItem("chub_cart") || "[]");
      setCount(c.reduce((a: number, i: any) => a + i.quantity, 0));
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <header className="border-b border-slate-200">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Logo />
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/admin" className="hover:underline">Admin</Link>
          <Link href="/cart" className="relative hover:underline">Cart ({count})</Link>
          <Link href="/login" className="hover:underline">Login</Link>
        </nav>
      </div>
    </header>
  );
}