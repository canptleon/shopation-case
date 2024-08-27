import React from "react";

interface CartTotalProps {
  total: number;
}

const CartTotal: React.FC<CartTotalProps> = ({ total }) => {
  return (
    <tr>
      <td colSpan={3} className="border border-gray-300 p-[20px] font-bold">
        Total:
      </td>
      <td colSpan={1} className="border border-gray-300 p-[20px] font-bold">
        {total.toFixed(2)}₺
      </td>
      <td className="border border-gray-300 p-[20px]"></td>
    </tr>
  );
};

export default React.memo(CartTotal);
