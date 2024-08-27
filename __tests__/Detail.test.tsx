import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Detail from '../pages/detail';
import { useAppContext } from '@/context/index';
import { Product } from '@/data/types/general';

jest.mock('@/context/index', () => ({
  useAppContext: jest.fn(),
}));

describe('Detail Page Component', () => {
  const mockProduct: Product = {
    id: '1',
    name: 'Test Product',
    image: '/test-image.jpg',
    price: '100.00',
    description: 'Test description',
    brand: 'Test Brand',
    model: 'Test Model',
    createdAt: '2023-01-01T00:00:00Z',
  };

  beforeEach(() => {
    useAppContext.mockReturnValue({
      addToCart: jest.fn(),
      cart: [],
    });
  });

  it('renders the product details correctly', () => {
    render(<Detail product={mockProduct} />);
  
    expect(screen.getByText('Test Product')).toBeInTheDocument();
  
    expect(screen.getByText('100.00₺')).toBeInTheDocument();
  
    expect(screen.getByText('Test description')).toBeInTheDocument();
  
    expect(screen.getByText(/Test Brand/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Model/i)).toBeInTheDocument();
  });
  
  

  it('calls addToCart when the Add to Cart button is clicked', () => {
    const { addToCart } = useAppContext();

    render(<Detail product={mockProduct} />);

    const addButton = screen.getByText(/add to cart/i);
    fireEvent.click(addButton);

    expect(addToCart).toHaveBeenCalledWith({
      id: '1',
      name: 'Test Product',
      price: '100.00',
      quantity: 1,
    });
  });

  it('displays the product image correctly', () => {
    render(<Detail product={mockProduct} />);

    const productImage = screen.getByAltText('Test Product');
    expect(productImage).toHaveAttribute('src', '/test-image.jpg');
  });
});
