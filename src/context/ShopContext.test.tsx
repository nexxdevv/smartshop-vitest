import { render, screen, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ShopProvider, useShop } from './ShopContext';

const TestComponent = () => {
  const { cart, addToCart, removeFromCart, clearCart, cartCount } = useShop();
  return (
    <div>
      <span data-testid="count">{cartCount}</span>
      <button onClick={() => addToCart({ id: '1', name: 'Earbuds', price: 50, emoji: '🎧' })}>Add</button>
      <button onClick={() => removeFromCart('1')}>Remove</button>
      <button onClick={() => clearCart()}>Clear</button>
      <div data-testid="items">{cart.length}</div>
    </div>
  );
};

describe('ShopContext & Cart Operations', () => {
  it('allows items to be added, quantities incremented, decremented, and cleared', async () => {
    render(
      <ShopProvider>
        <TestComponent />
      </ShopProvider>
    );

    expect(screen.getByTestId('count').textContent).toBe('0');

    // Add item
    await act(async () => {
      screen.getByText('Add').click();
    });
    expect(screen.getByTestId('count').textContent).toBe('1');

    // Add identical item (increases quantity, count matches total item quantity)
    await act(async () => {
      screen.getByText('Add').click();
    });
    expect(screen.getByTestId('count').textContent).toBe('2');

    // Remove item (reduces quantity)
    await act(async () => {
      screen.getByText('Remove').click();
    });
    expect(screen.getByTestId('count').textContent).toBe('1');

    // Clear cart entirely
    await act(async () => {
      screen.getByText('Clear').click();
    });
    expect(screen.getByTestId('count').textContent).toBe('0');
  });
});