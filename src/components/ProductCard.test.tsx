import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ProductCard from "./ProductCard";
import { ShopProvider } from "@/context/ShopContext";

describe("ProductCard Integration Layout", () => {
  const sampleProduct = {
    id: "test-1",
    name: "Retro Earbuds",
    category: "Earbuds",
    description: "Amazing hi-fi quality audio soundscapes.",
    price: 99,
    emoji: "🎧",
    inStock: true,
  };

  it("renders all product elements correctly and handles checkout actions", () => {
    render(
      <ShopProvider>
        <ProductCard product={sampleProduct} />
      </ShopProvider>,
    );

    expect(screen.getByText("Retro Earbuds")).toBeInTheDocument();
    expect(screen.getByText("$99")).toBeInTheDocument();
    expect(screen.getByText("In Stock")).toBeInTheDocument();
    expect(screen.getByText("🎧")).toBeInTheDocument();

    const addBtn = screen.getByRole("button", { name: /add to cart/i });
    expect(addBtn).not.toBeDisabled();
  });

  it("disables checkout action options if stock status is false", () => {
    const outOfStockProduct = { ...sampleProduct, inStock: false };
    render(
      <ShopProvider>
        <ProductCard product={outOfStockProduct} />
      </ShopProvider>,
    );

    const addBtn = screen.getByRole("button", { name: /out of stock/i });
    expect(addBtn).toBeDisabled();

    // Fix: Assert that we found exactly 2 "Out of Stock" text occurrences on the card
    const statusElements = screen.getAllByText("Out of Stock");
    expect(statusElements).toHaveLength(2);
  });
});
