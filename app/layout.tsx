import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TnG Fraud Detector",
  description: "Financial app with secure PIN feature",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
