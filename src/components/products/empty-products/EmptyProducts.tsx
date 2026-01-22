import Image from 'next/image';

interface Props {
  message: string;
}

export const EmptyProducts = ({ message }: Props) => {
  return (
    <div className="flex h-full flex-col items-center justify-center text-gray-500 text-center gap-4">
      
      <Image
        src="/imgs/empty-category.png"
        alt="No hay productos disponibles"
        width={500}
        height={500}
        priority
      />

    </div>
  );
};
