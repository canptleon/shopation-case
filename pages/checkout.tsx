import React, { useMemo, useCallback } from "react";
import Layout from "@/layouts/Layout";
import { useAppContext } from "@/context/index";
import CartItem from "@/components/Checkout/CartItem";
import CartTotal from "@/components/Checkout/CartTotal";

function Checkout() {
  const { cart, addToCart, decreaseFromCart, removeFromCart } = useAppContext();

  const totalAmount = useMemo(() => {
    return cart.reduce((total, item) => total + Number(item.price) * item.quantity, 0);
  }, [cart]);

  const handleAdd = useCallback(
    item => {
      addToCart(item);
    },
    [addToCart]
  );

  const handleDecrease = useCallback(
    id => {
      decreaseFromCart(id);
    },
    [decreaseFromCart]
  );

  const handleRemove = useCallback(
    id => {
      removeFromCart(id);
    },
    [removeFromCart]
  );

  return (
    <Layout>
      <div className="container mx-auto">
        <h1 className="px-6 mx-auto  text-2xl font-bold mb-2">Checkout</h1>
        <div className="p-6 mx-auto xsfull:max-w-full xsfull:overflow-x-scroll">
          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty</p>
          ) : (
            <table className="w-full border-collapse border border-gray-300 bg-white">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-[20px] text-left">Item</th>
                  <th className="border border-gray-300 p-[20px] text-left">Price</th>
                  <th className="border border-gray-300 p-[20px] text-left">Quantity</th>
                  <th className="border border-gray-300 p-[20px] text-left">Total</th>
                  <th className="border border-gray-300 p-[20px] text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cart.map(item => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onAdd={handleAdd}
                    onDecrease={handleDecrease}
                    onRemove={handleRemove}
                  />
                ))}
                <CartTotal total={totalAmount} />
              </tbody>
            </table>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Checkout;
