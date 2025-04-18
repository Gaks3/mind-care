import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { GeistSans } from "geist/font/sans";
import Provider from "@/lib/provider";

const font = GeistSans;

export const metadata: Metadata = {
  title: "MindCare | Mental Health with AI",
  description:
    "MindCare is an innovative platform that combines artificial intelligence technology with mental health principles, providing personalized support for each user.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/logo.svg" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <body className={font.className}>
        <Provider>
          {children}
          <Toaster richColors />
        </Provider>
      </body>
    </html>
  );
}
