import type { Metadata } from "next";
import { Poppins, Alfa_Slab_One } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const alfaSlabOne = Alfa_Slab_One({
  variable: "--font-alfa",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AIR & EDGE — Hair Show & Workshop 2026",
  description:
    "Registrasi untuk acara AIR & EDGE Hair Show & Workshop, 18-19 August 2026 di EPISODE Gading Serpong. Collaboration with Epoch Academy & Hikari Scissors. Featuring Tony Tsai & Shinichi Takahashi.",
  keywords: [
    "AIR & EDGE",
    "Hair Show",
    "Workshop",
    "Hairstyling",
    "Tony Tsai",
    "Shinichi Takahashi",
    "Epoch Academy",
    "Hikari Scissors",
  ],
  openGraph: {
    title: "AIR & EDGE — Hair Show & Workshop 2026",
    description:
      "Join us for an exclusive Hair Show & Workshop event featuring international guest speakers.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${poppins.variable} ${alfaSlabOne.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground font-[var(--font-poppins)]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
