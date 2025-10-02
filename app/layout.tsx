import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { LoadingBar } from "@/components/loading-bar";
import { ViewTransitions } from "@/components/view-transitions";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FocoTotal - Plataforma de Estudos para Concursos",
  description: "Organize seus estudos, acompanhe seu desempenho e alcance a aprovação no concurso público dos seus sonhos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <Suspense fallback={null}>
            <LoadingBar />
            <ViewTransitions />
          </Suspense>
          <div className="page-transition">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
