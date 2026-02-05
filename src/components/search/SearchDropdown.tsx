'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { IoCloseOutline } from 'react-icons/io5';

import { Product } from '@/interfaces';
import { searchProducts } from '@/services/search.service';

interface Props {
  onClose: () => void;
}

export const SearchDropdown = ({ onClose }: Props) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  // 🔑 Cerrar con tecla ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () =>
      document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // 🔍 Búsqueda con debounce
  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await searchProducts(query.trim());
        setResults(res);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
      onClick={onClose} // 👈 click fuera
      role="dialog"
      aria-modal="true"
    >
      <div
        className="
          max-w-2xl mx-auto mt-24
          bg-white rounded-2xl
          shadow-lg overflow-hidden
        "
        onClick={e => e.stopPropagation()} // 👈 click dentro NO cierra
      >
        {/* Input */}
        <div className="flex items-center px-4 py-3 border-b">
          <input
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Buscar productos..."
            className="w-full outline-none text-sm"
          />

          <button
            onClick={onClose}
            aria-label="Cerrar búsqueda"
            className="p-1 rounded hover:bg-gray-100"
          >
            <IoCloseOutline className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto">
          {loading && (
            <p className="p-4 text-sm text-gray-400">
              Buscando...
            </p>
          )}

          {!loading &&
            query.length >= 2 &&
            results.length === 0 && (
              <p className="p-4 text-sm text-gray-400">
                No se encontraron productos
              </p>
            )}

          {results.map(product => {
            const variant =
              product.variants.find(v => v.isDefault) ??
              product.variants[0];

            return (
              <Link
                key={product._id}
                href={`/product/${variant.sku}`}
                onClick={onClose}
                className="
                  block px-4 py-3
                  hover:bg-gray-50
                  transition
                "
              >
                <p className="text-sm font-medium">
                  {product.name}
                </p>
                <p className="text-xs text-gray-500">
                  ${variant.price}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
