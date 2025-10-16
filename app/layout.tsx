import "@/app/globals.css";
import { Poppins, Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const poppins = Poppins({ subsets: ["latin"], weight: ["600","700"], variable: "--font-heading" });
const inter = Inter({ subsets: ["latin"], weight: ["400","500"], variable: "--font-body" });

export const metadata = { title: "Cynthias Hub", description: "Minimalist marketplace demo" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-white text-slate-900 flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}