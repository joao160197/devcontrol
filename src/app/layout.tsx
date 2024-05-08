import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import {AuthProvider} from "@/provider/auth"
import { ModalProvider } from "@/provider/modal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dev Controle - Seu sistema de Gerenciamento.",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        
        <AuthProvider>
        <ModalProvider>
        <Header/>
        {children}
        </ModalProvider>
        </AuthProvider>
       
      </body>
    </html>
  );
}
