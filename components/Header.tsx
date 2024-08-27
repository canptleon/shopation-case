import React, { useState, useRef } from "react";
import Link from "next/link";
import { useAppContext } from "@/context/index";

function Header() {
  const { cart, addToCart, decreaseFromCart, removeFromCart } = useAppContext();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);

  const handleCartHover = () => setIsCartOpen(true);
  const handleCartLeave = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!cartRef.current?.contains(e.relatedTarget as Node)) {
      setIsCartOpen(false);
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0);
  };

  return (
    <div className="container mx-auto mt-3">
      <div className="relative bg-[linear-gradient(90deg,_rgba(26,215,255,1)_0%,_rgba(10,148,243,1)_100%)] text-white p-10 rounded-[10px] mb-5 xsfull:w-[97%] mx-auto">
        <Link
          href="/"
          className="text-xl font-bold absolute top-1/2 left-4 transform -translate-y-1/2 [filter:drop-shadow(2px_4px_1px_lightgray)] tracking-[1px] font-[system-ui]">
          SHOPATION
        </Link>
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-[999]">
          <Link className="hidden xsfull:block" href="/checkout" target="_self">
            <button className="text-[15px] bg-[white] text-[#0c9cf5] font-semibold hover:shadow-sm rounded-md shadow-md transition flex flex-row justify-center items-center p-[5px] z-[999]">
              <img src="/images/cart.png" className="max-w-[33px]" />
              <span className="absolute -top-[10px] -right-[11px] bg-[white] min-w-[22px] min-h-[22px] rounded-[100%] border-[1px] border-[solid] border-[#b1b1b1] flex flex-row justify-center items-center w-[22px] h-[22px] leading-none text-[13px] font-bold [filter:drop-shadow(2px_4px_6px_gray)]">
                {cart.reduce((count, item) => count + item.quantity, 0)}
              </span>
            </button>
          </Link>
          <div
            className="relative xsfull:hidden"
            onMouseEnter={handleCartHover}
            onMouseLeave={handleCartLeave}>
            <button className="text-[15px] bg-[white] text-[#0c9cf5] font-semibold hover:shadow-sm rounded-md shadow-md transition flex flex-row justify-center items-center p-[5px] z-[999]">
              <img src="/images/cart.png" className="max-w-[33px]" />
              <span className="absolute -top-[10px] -right-[11px] bg-[white] min-w-[22px] min-h-[22px] rounded-[100%] border-[1px] border-[solid] border-[#b1b1b1] flex flex-row justify-center items-center w-[22px] h-[22px] leading-none text-[13px] font-bold [filter:drop-shadow(2px_4px_6px_gray)]">
                {cart.reduce((count, item) => count + item.quantity, 0)}
              </span>
            </button>
            {isCartOpen && (
              <div
                ref={cartRef}
                className=" xsfull:hidden [box-shadow:2px_2px_14px_-5px_#6b6b6b] absolute right-0 top-full pt-2 w-[370px]  bg-white text-gray-800 border border-gray-300 rounded-md shadow-lg"
                onMouseEnter={handleCartHover}
                onMouseLeave={handleCartLeave}>
                <div className="p-4">
                  <h3 className="text-lg font-semibold border-b-[1px]  border-[#ebebeb] pb-[6px] mb-[9px]">
                    Cart Items
                  </h3>
                  {cart.length === 0 ? (
                    <p className="text-center text-gray-500">Your cart is empty</p>
                  ) : (
                    <ul className="custom-scrollbar overflow-y-scroll max-h-[300px] overflow-x-hidden pr-[12px]">
                      {cart.map(item => (
                        <li key={item.id} className="flex justify-between items-center mb-2">
                          <div className="flex flex-col">
                            <p className="text-[14px]">
                              {item.name} ({item.quantity})
                            </p>
                            <p className="font-semibold">{item.price}₺</p>
                          </div>
                          <div className="flex flex-row">
                            <div className="flex items-center">
                              <button
                                onClick={() => decreaseFromCart(item.id)}
                                className="px-2 py-1 border rounded-l">
                                -
                              </button>
                              <input
                                type="text"
                                readOnly
                                value={item.quantity}
                                className="w-8 text-center border-t border-b"
                              />
                              <button
                                onClick={() => addToCart(item)}
                                className="px-2 py-1 border rounded-r">
                                +
                              </button>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-500 text-[13px]">
                              <img src="/images/delete.png" className="max-w-[30px]" alt="" />
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="mt-4 flex justify-between items-center font-semibold border-t-[1px] border-b-[1px]  border-[#ebebeb] py-[6px]">
                    <span>Total:</span>
                    <span>{calculateTotal().toFixed(2)}₺</span>
                  </div>
                  <Link
                    href="/checkout"
                    className="text-xl w-full border rounded-[7px] py-[14px] font-bold text-[#12b4f9] border-[#12b4f9] hover:text-[#ffffff] hover:bg-[#12b4f9] transition text-center block mt-[15px] mx-[auto] mb-[0] !text-[19px]">
                    Checkout
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
