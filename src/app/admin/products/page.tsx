'use client';

import { useState, useEffect } from 'react';

// Define the shape of a product using TypeScript
type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  baseShippingCost?: number;
  discountPricePerUnit?: number;
  bulkThreshold?: number;
  bulkShippingCost?: number;
  palletShippingCost?: number;
  maxCap?: number;
  soldOut: boolean;
};

export default function AdminProducts() {
  const [formVisible, setFormVisible] = useState(false);
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

  const [products, setProducts] = useState<Product[]>([]);  // Specify the type for products array

  // Fetch products from the backend
  const fetchProducts = async () => {
    const response = await fetch('/api/products', {
      method: 'GET',
    });
    const data = await response.json();
    setProducts(data);  // This data is assumed to be an array of Product objects
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });

    if (response.ok) {
      setForm({
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

      setFormVisible(false);
      const newProduct = await response.json();
      setProducts([...products, newProduct]);  // Add new product to the list
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Admin Product Management</h1>

      <button onClick={() => setFormVisible(!formVisible)}>
        {formVisible ? 'Cancel' : 'Add Product'}
      </button>

      {formVisible && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Product Name:</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label>Description:</label>
            <input
              type="text"
              name="description"
              value={form.description}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label>Price (per unit):</label>
            <input
              type="number"
              step="0.01"
              name="price"
              value={form.price}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label>Stock:</label>
            <input
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Additional fields here */}

          <div>
            <label>Max Cap (Maximum Quantity Allowed):</label>
            <input
              type="number"
              name="maxCap"
              value={form.maxCap}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label>
              <input
                type="checkbox"
                name="soldOut"
                checked={form.soldOut}
                onChange={(e) =>
                  setForm({ ...form, soldOut: e.target.checked })
                }
              />
              Mark as Sold Out
            </label>
          </div>

          <button type="submit">Submit</button>
        </form>
      )}

      {/* Display list of existing products */}
      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - £{product.price} (Stock: {product.stock})
            <button>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
