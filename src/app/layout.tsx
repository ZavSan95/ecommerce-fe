import type { Metadata } from 'next';
import { inter } from '@/config/fonts';



import './globals.css';
import { ReduxProvider } from '@/store/Provider';



export const metadata: Metadata = {
  title: 'Teslo | Shop',
  description: 'Una tienda virtual de productos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ReduxProvider>
      <body className={inter.className}>{children}</body>
      </ReduxProvider>
    </html>
  )
}
