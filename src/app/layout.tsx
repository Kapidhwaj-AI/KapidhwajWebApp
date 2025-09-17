import type { Metadata } from "next";
import "../styles/globals.css";
import { jakarta, notoGuj, notoHindi } from "@/lib/fonts";
import { Providers } from "@/providers/Providers";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getLocale } from 'next-intl/server';
import { ToastProvider } from "@/components/common/ToastProvider";


export const metadata: Metadata = {
  title: "Kapidhwaj AI",
  description: "Kapidhwaj AI is a smart surveillance system with AI-powered cameras for face recognition, vehicle number plate detection, fire & smoke alerts, people counting, intrusion detection, and secure video recordings.",
  icons:{
    icon:'/assets/images/logo-square.webp'
  },
  
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="preload" as="image" href="/assets/images/auth-bg.webp" />
        <link rel="preload" as="image" href="/assets/images/logo-rectangle.webp" />
      </head>
      <body
        className={`${jakarta.variable} ${notoGuj.variable} ${notoHindi.variable} antialiased bg-[var(--surface-150)]`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            {children}
            <ToastProvider />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
