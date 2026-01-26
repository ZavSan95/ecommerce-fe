import type { Metadata } from 'next';
import { inter } from '@/config/fonts';
import './globals.css';

import { ReduxProvider } from '@/store/Provider';
import { AuthBootstrap } from '@/components/auth/AuthBootstrap';
import { Toaster } from 'react-hot-toast';
import { ClientOnly } from '@/components';

export const metadata: Metadata = {
  title: 'Ecommerce | Shop',
  description: 'Una tienda virtual de productos',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>

        <ReduxProvider>
          <ClientOnly>
            <AuthBootstrap>
              <Toaster position="top-left" />
            </AuthBootstrap>
          </ClientOnly>

          {children}
        </ReduxProvider>

      </body>
    </html>
  );
}
