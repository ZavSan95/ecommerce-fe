import { Footer, Sidebar, TopMenu } from '@/components';
import { CartDrawer } from '../../components/cart/CartDrawer';

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen flex flex-col bg-gray-50">

      {/* Top menu sticky en mobile */}
      <header className="sticky top-0 z-30 bg-white shadow-sm">
        <TopMenu />
      </header>

      {/* Sidebar (overlay, fuera del flujo) */}
      <Sidebar />
      <CartDrawer/>

      {/* Contenido */}
      <section
        className="
          flex-1
          px-4 py-4
          sm:px-10 sm:py-6
          max-w-[1400px]
          w-full
          mx-auto
        "
      >
        {children}
      </section>

      {/* Footer */}
      <footer className="mt-8 sm:mt-12">
        <Footer />
      </footer>

    </main>
  );
}
