import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Navbar from './Navbar';
import { ShopProvider } from '@/context/ShopContext';

// Mock Next.js Link component cleanly
vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

describe('Navbar Component', () => {
  it('opens and closes the slide-in mobile navigation menu drawer', () => {
    render(
      <ShopProvider>
        <Navbar />
      </ShopProvider>
    );

    // Grab the mobile burger menu toggle button
    const menuToggle = screen.getByLabelText('Toggle menu');
    expect(menuToggle).toBeInTheDocument();

    // Verify side nav drawer starts off-screen (closed state hidden by styling attributes)
    const sideDrawer = screen.getByTestId('mobile-drawer');
    expect(sideDrawer.className).toContain('translate-x-full');

    // Click burger menu to open drawer
    fireEvent.click(menuToggle);
    expect(sideDrawer.className).not.toContain('translate-x-full');

    // Click backdrop or close action button
    const closeButton = screen.getByLabelText('Close menu');
    fireEvent.click(closeButton);
    expect(sideDrawer.className).toContain('translate-x-full');
  });
});