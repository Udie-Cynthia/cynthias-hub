import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

export default function ProductCard({ product }: { product: any }) {
  return (
    <div className="card overflow-hidden">
      <Link href={`/product/${product.id}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.imageUrl} alt={product.title} className="w-full h-56 object-cover" />
      </Link>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 line-clamp-1">{product.title}</h3>
        <p className="text-slate-600 text-sm line-clamp-2 mb-3">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="font-semibold">{formatCurrency(product.price)}</span>
          <button className="btn btn-primary" onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

function addToCart(product: any) {
  const cart = JSON.parse(localStorage.getItem("chub_cart") || "[]");
  const idx = cart.findIndex((i: any) => i.id === product.id);
  if (idx >= 0) cart[idx].quantity += 1; else cart.push({ ...product, quantity: 1 });
  localStorage.setItem("chub_cart", JSON.stringify(cart));
  window.dispatchEvent(new StorageEvent("storage"));
}