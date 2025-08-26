import type { Metadata } from "next";
import "../styles/globals.css";
import { jakarta, notoGuj, notoHindi } from "@/lib/fonts";

import { Providers } from "@/providers/Providers";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getLocale } from 'next-intl/server';
import { ToastContainer } from 'react-toastify';
import SocketNotification from "@/components/common/SocketNotification";
export const metadata: Metadata = {
  title: "Kapidhwaj AI",
  description: "",
  icons: {
    icon: '/assets/images/logo-square.png'
  }
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
      <body
        className={`${jakarta.variable} ${notoGuj.variable} ${notoHindi.variable} antialiased bg-[var(--surface-150)]`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            <SocketNotification />
            {children}
          </Providers>
          <ToastContainer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
