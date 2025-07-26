import type { Metadata } from "next";
import "../styles/globals.css";
import { jakarta } from "@/lib/fonts";
import { Providers } from "@/providers/Providers";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getLocale } from 'next-intl/server';

export const metadata: Metadata = {
  title: "Kapidhwaj AI",
  description: "",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  console.log(locale, "locale" )
  const messages = await getMessages();
  return (
    <html lang={locale} suppressHydrationWarning>
      {/* suppressHydrationWarning */}
      <body
        className={`${jakarta.variable} antialiased bg-[var(--surface-150)]`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            {children} 
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
