import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ApplicationProviders } from "./ApplicationProviders";
import { MainLayout } from "layouts";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trello Board",
  description: "Created by Muhammad Mateen",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApplicationProviders>
          <MainLayout>{children}</MainLayout>
        </ApplicationProviders>
      </body>
    </html>
  );
}
