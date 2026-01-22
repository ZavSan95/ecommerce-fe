'use client';

import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5';

interface Props {
  quantity: number;
  max?: number;
  onChange: (newQuantity: number) => void;
}

export const QuantitySelector = ({ quantity, max, onChange }: Props) => {

  const changeQuantity = (delta: number) => {
    const newValue = quantity + delta;

    if (newValue < 1) return;
    if (max !== undefined && newValue > max) return;

    onChange(newValue);
  };

  return (
    <div className="flex items-center">
      <button onClick={() => changeQuantity(-1)}>
        <IoRemoveCircleOutline size={30} />
      </button>

      <span className="w-14 mx-3 px-3 py-1 bg-gray-100 text-center rounded">
        {quantity}
      </span>

      <button onClick={() => changeQuantity(1)}>
        <IoAddCircleOutline size={30} />
      </button>
    </div>
  );
};
