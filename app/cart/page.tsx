"use client";
import { useEffect, useState } from "react";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";

type Item = { id: number; title: string; price: number; quantity: number; imageUrl: string };

export default function CartPage() {
  const [items, setItems] = useState<Item[]>([]);
  useEffect(() => {
    setItems(JSON.parse(localStorage.getItem("chub_cart") || "[]"));
  }, []);

  const total = items.reduce((a, i) => a + i.price * i.quantity, 0);

  function update(id: number, q: number) {
    const next = items.map(i => i.id === id ? { ...i, quantity: Math.max(1, q) } : i);
    setItems(next);
    localStorage.setItem("chub_cart", JSON.stringify(next));
  }

  function remove(id: number) {
    const next = items.filter(i => i.id !== id);
    setItems(next);
    localStorage.setItem("chub_cart", JSON.stringify(next));
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Your Cart</h1>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-3">
          {items.length === 0 && <div className="card p-6">Cart is empty.</div>}
          {items.map(i => (
            <div key={i.id} className="card p-4 flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={i.imageUrl} className="w-20 h-20 object-cover rounded-xl border" alt="" />
              <div className="flex-1">
                <div className="font-medium">{i.title}</div>
                <div className="text-slate-600 text-sm">{formatCurrency(i.price)}</div>
              </div>
              <input type="number" className="input w-24" value={i.quantity} onChange={e=>update(i.id, Number(e.target.value))} />
              <button className="btn" onClick={()=>remove(i.id)}>Remove</button>
            </div>
          ))}
        </div>
        <aside className="card p-6 h-fit space-y-3">
          <div className="flex justify-between"><span>Subtotal</span><span>{formatCurrency(total)}</span></div>
          <Link className="btn btn-primary w-full text-center" href="/checkout">Checkout</Link>
        </aside>
      </div>
    </div>
  );
}