'use client';

interface SpinnerProps {
  label?: string;
}

export const Spinner = ({ label = 'Cargando...' }: SpinnerProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-gray-600">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600 mb-3" />
      <p className="text-sm">{label}</p>
    </div>
  );
};
