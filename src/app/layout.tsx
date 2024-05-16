import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { AuthProvider } from "@/provider/auth";
import { ModalProvider } from "@/provider/modal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dev Controle - Seu sistema de Gerenciamento.",
  description: "",
};

interface LayoutProps {
  children: React.ReactNode;
  types: any; 
}

const RootLayout: React.FC<LayoutProps> = ({ children, types }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ModalProvider>
            <Header />
            {children}
          </ModalProvider>
        </AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
