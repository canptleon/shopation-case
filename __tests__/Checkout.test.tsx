import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Checkout from '../pages/checkout';
import { useAppContext } from '@/context/index';

jest.mock('@/context/index', () => ({
  useAppContext: jest.fn(),
}));

describe('Checkout Page Component', () => {
  const mockCartItem = {
    id: '1',
    name: 'Test Product',
    price: '50.00',
    quantity: 2,
  };

  beforeEach(() => {
    useAppContext.mockReturnValue({
      cart: [mockCartItem],
      addToCart: jest.fn(),
      decreaseFromCart: jest.fn(),
      removeFromCart: jest.fn(),
    });
  });

  it('shows the empty cart message when cart is empty', () => {
    useAppContext.mockReturnValueOnce({
      cart: [],
      addToCart: jest.fn(),
      decreaseFromCart: jest.fn(),
      removeFromCart: jest.fn(),
    });

    render(<Checkout />);

    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
  });

  it('calls addToCart when the "Add" button is clicked', () => {
    const { addToCart } = useAppContext();

    render(<Checkout />);

    const addButton = screen.getAllByText('+')[0];
    fireEvent.click(addButton);

    expect(addToCart).toHaveBeenCalledWith(mockCartItem);
  });

  it('calls decreaseFromCart when the "Decrease" button is clicked', () => {
    const { decreaseFromCart } = useAppContext();

    render(<Checkout />);

    const decreaseButton = screen.getAllByText('-')[0];
    fireEvent.click(decreaseButton);

    expect(decreaseFromCart).toHaveBeenCalledWith('1');
  });

});
