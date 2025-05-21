import type { Metadata } from "next";
import "../styles/globals.css";
import { jakarta } from "@/lib/fonts";
import { Providers } from "@/providers/Providers";

export const metadata: Metadata = {
  title: "Kapidhwaj AI",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* suppressHydrationWarning */}
      <body
        className={`${jakarta.variable} antialiased bg-[var(--surface-150)]`}
      >
        <Providers>
          {children} {/* This will render either auth or app layout */}
        </Providers>
      </body>
    </html>
  );
}
