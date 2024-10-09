type CartItem = {
    id: number;
    name: string;
    price: number;
    quantity: number;
    baseShippingCost?: number;
    bulkThreshold?: number;
    bulkShippingCost?: number;
    palletShippingCost?: number;
  };
  
  type CheckoutProps = {
    cart: CartItem[];
  };
  
  export default function Checkout({ cart }: CheckoutProps) {
    const calculateTotal = () => {
      let total = 0;
      cart.forEach((item: CartItem) => {
        total += item.price * item.quantity;
      });
      return total;
    };
  
    const calculateShipping = () => {
      let shipping = 0;
      cart.forEach((item: CartItem) => {
        if (item.quantity > 50 && item.palletShippingCost) {
          // Apply pallet shipping if applicable
          shipping += item.palletShippingCost;
        } else if (item.bulkShippingCost && item.quantity > (item.bulkThreshold || 0)) {
          // Apply bulk shipping cost for large orders
          shipping += item.bulkShippingCost * Math.ceil(item.quantity / 6);
        } else {
          // Base shipping cost calculation
          shipping += (item.baseShippingCost || 0) * Math.ceil(item.quantity / 6);
        }
      });
      return shipping;
    };
  
    return (
      <div>
        <h2>Order Summary</h2>
        <ul>
          {cart.map((item: CartItem) => (
            <li key={item.id}>
              {item.name} x {item.quantity}: £{item.price * item.quantity}
            </li>
          ))}
        </ul>
  
        <h3>Shipping Breakdown</h3>
        <p>Shipping: £{calculateShipping()}</p>
  
        <h3>Total</h3>
        <p>Total Price: £{calculateTotal() + calculateShipping()}</p>
      </div>
    );
  }
  