export default function Footer() {
  const email = process.env.CONTACT_EMAIL!;
  const phone = process.env.CONTACT_PHONE!;
  const li = process.env.CONTACT_LINKEDIN!;
  return (
    <footer className="mt-12 border-t border-slate-200">
      <div className="container mx-auto px-4 py-10 grid gap-6 md:grid-cols-3 text-sm text-slate-600">
        <div>
          <h3 className="font-semibold text-slate-900 mb-2">About</h3>
          <p>Cynthias Hub is a minimalist e-commerce demo showcasing clean UI, simple auth, CRUD, and a simulated checkout.</p>
        </div>
        <div>
          <h3 className="font-semibold text-slate-900 mb-2">Contact</h3>
          <ul className="space-y-1">
            <li>Email: <a className="underline" href={`mailto:${email}`}>{email}</a></li>
            <li>Phone: <a className="underline" href={`tel:${phone}`}>{phone}</a></li>
            <li>LinkedIn: <a className="underline" href={li} target="_blank">Profile</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-slate-900 mb-2">Tech</h3>
          <p>Next.js  TypeScript  Tailwind  Prisma  SQLite  Docker</p>
        </div>
      </div>
    </footer>
  );
}