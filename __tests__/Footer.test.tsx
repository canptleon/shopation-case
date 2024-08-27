import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer';

describe('Footer Component', () => {
  it('renders the developer link correctly', () => {
    render(<Footer />);
    
    const linkElement = screen.getByRole('link', {
      name: /developed by arda keyişoğlu/i,
    });

    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', 'https://www.linkedin.com/in/ardakeyisoglu/');
  });
});
