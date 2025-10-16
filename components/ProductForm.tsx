"use client";
import { useState } from "react";

export default function ProductForm({ initial, onSaved }: { initial?: any; onSaved?: () => void }) {
  const [form, setForm] = useState(initial || { title: "", description: "", price: 0, imageUrl: "/placeholder.png" });
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true);
    const method = form.id ? "PUT" : "POST";
    const url = form.id ? `/api/products/${form.id}` : "/api/products";
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify({
      title: form.title, description: form.description, price: Number(form.price), imageUrl: form.imageUrl,
    })});
    setLoading(false);
    if (res.ok) onSaved?.(); else alert("Save failed");
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <input className="input" placeholder="Title" value={form.title} onChange={e=>setForm({ ...form, title: e.target.value })} />
      <textarea className="input min-h-24" placeholder="Description" value={form.description} onChange={e=>setForm({ ...form, description: e.target.value })} />
      <input className="input" type="number" placeholder="Price (kobo)" value={form.price} onChange={e=>setForm({ ...form, price: e.target.value })} />
      <input className="input" placeholder="Image URL" value={form.imageUrl} onChange={e=>setForm({ ...form, imageUrl: e.target.value })} />
      <button className="btn btn-primary" disabled={loading}>{loading ? "Saving..." : "Save Product"}</button>
    </form>
  );
}