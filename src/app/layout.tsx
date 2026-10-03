import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cosméticos de Luxo",
  description: "E-commerce de cosméticos de alta qualidade.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
