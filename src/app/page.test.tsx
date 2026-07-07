import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Home from './page';
import { ShopProvider } from '@/context/ShopContext';

describe('SmartShop Initial Launch', () => {
  it('renders the welcome layout headline', () => {
    render(<ShopProvider ><Home /></ShopProvider>);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
  });
});