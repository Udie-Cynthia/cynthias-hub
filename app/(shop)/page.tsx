import { prisma } from "@/lib/db";
import ProductCard from "@/components/ProductCard";

export default async function HomePage() {
  const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div className="space-y-8">
      <section className="text-center">
        <h1 className="text-3xl md:text-4xl font-semibold">Curated Picks</h1>
        <p className="text-slate-600 mt-2">Minimal products, maximum polish.</p>
      </section>
      <section className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map(p => <ProductCard key={p.id} product={p} />)}
      </section>
    </div>
  );
}