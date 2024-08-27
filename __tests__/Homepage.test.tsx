import React from 'react';
import { render, screen } from '@testing-library/react';
import Homepage from '../pages/index';
import { useAppContext } from '@/context/index';
import { useRouter } from 'next/router';

jest.mock('@/context/index', () => ({
  useAppContext: jest.fn(),
}));

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Homepage Component', () => {
  beforeEach(() => {
    useAppContext.mockReturnValue({
      addToCart: jest.fn(),
      cart: [],
    });

    useRouter.mockReturnValue({
      query: {},
      push: jest.fn(),
      pathname: '/',
    });
  });

  it('renders the homepage with necessary components', () => {
    const emptyProductList = [];

    render(<Homepage initialProducts={emptyProductList} initialTotalPages={1} />);

    expect(screen.getByText("We couldn't find any product that fits your queries.")).toBeInTheDocument();

    expect(screen.getByText('SHOPATION')).toBeInTheDocument();
  });
});
