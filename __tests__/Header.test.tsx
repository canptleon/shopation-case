import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../components/Header';
import { useAppContext } from '@/context/index';

jest.mock('@/context/index', () => ({
  useAppContext: jest.fn(),
}));

describe('Header Component', () => {
  beforeEach(() => {
    useAppContext.mockReturnValue({
      cart: [{ id: 1, name: 'Test Product', price: '10.00', quantity: 2 }],
      addToCart: jest.fn(),
      decreaseFromCart: jest.fn(),
      removeFromCart: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the header with the shop name', () => {
    render(<Header />);
    const shopName = screen.getByText('SHOPATION');
    expect(shopName).toBeInTheDocument();
  });

  it('displays the cart icon with the correct item count', () => {
    render(<Header />);
    const cartCount = screen.getAllByText('2');
    expect(cartCount).toHaveLength(2);
  });

  it('shows the cart items on hover', () => {
    render(<Header />);
    const cartButtons = screen.getAllByRole('button');
    fireEvent.mouseEnter(cartButtons[1]);
    const cartItem = screen.getByText('Test Product (2)');
    expect(cartItem).toBeInTheDocument();
  });

  it('calls decreaseFromCart when the "-" button is clicked', () => {
    const { decreaseFromCart } = useAppContext();
    render(<Header />);
    const cartButtons = screen.getAllByRole('button');
    fireEvent.mouseEnter(cartButtons[1]);
    const decreaseButton = screen.getAllByText('-')[0];
    fireEvent.click(decreaseButton);
    expect(decreaseFromCart).toHaveBeenCalledWith(1);
  });

  it('calls addToCart when the "+" button is clicked', () => {
    const { addToCart } = useAppContext();
    render(<Header />);
    const cartButtons = screen.getAllByRole('button');
    fireEvent.mouseEnter(cartButtons[1]);
    const increaseButton = screen.getAllByText('+')[0];
    fireEvent.click(increaseButton);
    expect(addToCart).toHaveBeenCalledWith({
      id: 1,
      name: 'Test Product',
      price: '10.00',
      quantity: 2,
    });
  });

  it('calls removeFromCart when the delete button is clicked', () => {
    const { removeFromCart } = useAppContext();
    render(<Header />);
    const cartButtons = screen.getAllByRole('button');
    fireEvent.mouseEnter(cartButtons[1]);
    const deleteButton = screen.getAllByAltText('')[0];
    fireEvent.click(deleteButton);
    expect(removeFromCart).toHaveBeenCalledWith(1);
  });

  it('displays the correct total price', () => {
    render(<Header />);
    const cartButtons = screen.getAllByRole('button');
    fireEvent.mouseEnter(cartButtons[1]);
    const totalPrice = screen.getByText('20.00₺');
    expect(totalPrice).toBeInTheDocument();
  });

});
