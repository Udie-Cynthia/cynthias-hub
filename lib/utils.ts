export const formatCurrency = (kobo: number) =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(kobo / 100);
export function clsx(...args: (string | false | null | undefined)[]) { return args.filter(Boolean).join(" "); }