import React from "react";

interface CartItemProps {
  item: {
    id: string;
    name: string;
    price: string;
    quantity: number;
  };
  onAdd: (item: any) => void;
  onDecrease: (id: string) => void;
  onRemove: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onAdd, onDecrease, onRemove }) => {
  return (
    <tr>
      <td className="border border-gray-300 p-[20px]">{item.name}</td>
      <td className="border border-gray-300 p-[20px]">{item.price}₺</td>
      <td className="border border-gray-300 p-[20px]">
        <div className="flex items-center justify-center">
          <button onClick={() => onDecrease(item.id)} className="px-2 py-1 border rounded-l">
            -
          </button>
          <input
            type="text"
            readOnly
            value={item.quantity}
            className="w-12 text-center border-t border-b"
          />
          <button onClick={() => onAdd(item)} className="px-2 py-1 border rounded-r">
            +
          </button>
        </div>
      </td>
      <td className="border border-gray-300 p-[20px]">
        {(Number(item.price) * item.quantity).toFixed(2)}₺
      </td>
      <td className="border border-gray-300 p-[20px]">
        <button onClick={() => onRemove(item.id)} className="text-red-500">
          <img src="/images/delete.png" className="max-w-[30px]" />
        </button>
      </td>
    </tr>
  );
};

export default React.memo(CartItem);
