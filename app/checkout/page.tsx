"use client";
import { useEffect, useState } from "react";
import { formatCurrency } from "@/lib/utils";

export default function Checkout() {
  const [items, setItems] = useState<any[]>([]);
  const total = items.reduce((a, i) => a + i.price * i.quantity, 0);

  useEffect(() => { setItems(JSON.parse(localStorage.getItem("chub_cart") || "[]")); }, []);

  async function placeOrder() {
    const res = await fetch("/api/orders", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items })});
    if (res.ok) {
      localStorage.removeItem("chub_cart");
      alert("Order placed! (simulated)");
      window.location.href = "/";
    } else {
      alert("Order failed");
    }
  }

  return (
    <div className="max-w-xl mx-auto card p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Checkout</h1>
      <ul className="space-y-2 text-sm">
        {items.map(i=> (<li key={i.id} className="flex justify-between"><span>{i.title}  {i.quantity}</span><span>{formatCurrency(i.price * i.quantity)}</span></li>))}
      </ul>
      <div className="flex justify-between font-semibold"><span>Total</span><span>{formatCurrency(total)}</span></div>
      <button className="btn btn-primary w-full" onClick={placeOrder}>Place Order</button>
      <p className="text-xs text-slate-500">This is a demono real payments are processed.</p>
    </div>
  );
}