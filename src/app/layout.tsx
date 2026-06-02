import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Prestigio Roleplay - Normativas del Servidor",
  description: "Normativas y reglas oficiales del servidor Prestigio Roleplay. GTA V Roleplay con las normas más completas.",
  keywords: ["Prestigio Roleplay", "GTA V", "Roleplay", "Normativas", "Reglas", "RP"],
  authors: [{ name: "Prestigio Roleplay" }],
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "Prestigio Roleplay - Normativas",
    description: "Normativas y reglas oficiales del servidor Prestigio Roleplay",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased`}
        style={{ backgroundColor: '#0a0a0f', color: '#e4e4e7' }}
      >
        {children}
      </body>
    </html>
  );
}
