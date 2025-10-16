import { prisma } from "@/lib/db";
import { cookies } from "next/headers";
import { verifyJwt } from "@/lib/jwt";
import ProductForm from "@/components/ProductForm";

async function requireAdmin() {
  const token = cookies().get("chub_token")?.value;
  if (!token) return null;
  try { const user = verifyJwt(token); return user.role === "ADMIN" ? user : null; } catch { return null; }
}

export default async function Admin() {
  const user = await requireAdmin();
  if (!user) return <div className="max-w-md mx-auto card p-6">Admins only. Please log in as admin.</div>;
  const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div className="grid md:grid-cols-3 gap-8">
      <aside className="card p-6">
        <h2 className="text-xl font-semibold mb-4">Add Product</h2>
        {/* @ts-expect-error Server Component boundary */}
        <ProductForm onSaved={() => {}} />
      </aside>
      <section className="md:col-span-2 space-y-4">
        <h2 className="text-xl font-semibold">Products</h2>
        {products.map(p => (
          <div key={p.id} className="card p-4 flex items-center justify-between">
            <div>
              <div className="font-medium">{p.title}</div>
              <div className="text-sm text-slate-600">#{p.id}  {(p.price/100).toFixed(2)}</div>
            </div>
            <div className="flex gap-2">
              <form action={`/api/products/${p.id}`} method="post">
                <input type="hidden" name="_method" value="DELETE" />
                <button className="btn" formAction={`/api/products/${p.id}`} formMethod="DELETE">Delete</button>
              </form>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}