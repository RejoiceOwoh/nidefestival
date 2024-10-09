'use client';

import { useState } from 'react';

export default function AdminProducts() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    baseShippingCost: '',
    discountPricePerUnit: '',
    bulkThreshold: '',
    bulkShippingCost: '',
    palletShippingCost: '',
    maxCap: '',
    soldOut: false,
  });

  // Specify event type as React.FormEvent<HTMLFormElement>
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();  // Prevent the default form submission behavior

    const response = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),  // Convert form data to JSON
    });

    const data = await response.json();
    console.log(data);  // Log response for debugging
  };

  return (
    <div>
      <h1>Create or Edit a Product</h1>

      <form onSubmit={handleSubmit}>
        {/* Product Name */}
        <div>
          <label>Product Name:</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>

        {/* Product Description */}
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        {/* Product Price */}
        <div>
          <label>Price (per unit):</label>
          <input
            type="number"
            step="0.01"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
          />
        </div>

        {/* Product Stock */}
        <div>
          <label>Stock:</label>
          <input
            type="number"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
            required
          />
        </div>

        {/* Base Shipping Cost */}
        <div>
          <label>Base Shipping Cost (per unit):</label>
          <input
            type="number"
            step="0.01"
            value={form.baseShippingCost}
            onChange={(e) => setForm({ ...form, baseShippingCost: e.target.value })}
          />
        </div>

        {/* Discounted Price for Bulk Orders */}
        <div>
          <label>Discounted Price (for bulk purchases):</label>
          <input
            type="number"
            step="0.01"
            value={form.discountPricePerUnit}
            onChange={(e) => setForm({ ...form, discountPricePerUnit: e.target.value })}
          />
        </div>

        {/* Bulk Purchase Threshold */}
        <div>
          <label>Bulk Purchase Threshold:</label>
          <input
            type="number"
            value={form.bulkThreshold}
            onChange={(e) => setForm({ ...form, bulkThreshold: e.target.value })}
          />
        </div>

        {/* Bulk Shipping Cost */}
        <div>
          <label>Bulk Shipping Cost (for large orders):</label>
          <input
            type="number"
            step="0.01"
            value={form.bulkShippingCost}
            onChange={(e) => setForm({ ...form, bulkShippingCost: e.target.value })}
          />
        </div>

        {/* Pallet Shipping Cost */}
        <div>
          <label>Pallet Shipping Cost (for orders over 50 boxes):</label>
          <input
            type="number"
            step="0.01"
            value={form.palletShippingCost}
            onChange={(e) => setForm({ ...form, palletShippingCost: e.target.value })}
          />
        </div>

        {/* Max Quantity Cap */}
        <div>
          <label>Max Cap (Maximum Quantity Allowed):</label>
          <input
            type="number"
            value={form.maxCap}
            onChange={(e) => setForm({ ...form, maxCap: e.target.value })}
          />
        </div>

        {/* Mark as Sold Out */}
        <div>
          <label>
            <input
              type="checkbox"
              checked={form.soldOut}
              onChange={(e) => setForm({ ...form, soldOut: e.target.checked })}
            />
            Mark as Sold Out
          </label>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
