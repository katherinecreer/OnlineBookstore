import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartSummary = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div
        style={{
            position: 'fixed',
            top: '10px',
            right: '20px',
            background: '#f8f9fa',
            padding: '12px 20px', // Adjusted padding
            borderRadius: '15px', // A more rounded shape
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center', // Align the text and icon nicely
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)', // A slightly stronger shadow for depth
            fontSize: '14px', // Slightly larger font
            transition: 'all 0.3s ease', // Smooth transition for hover effect
        }}
      onClick={() => navigate('/cart')}
    >🛒 <strong>{totalPrice.toFixed(2)}</strong>
    </div>
  );
};

export default CartSummary;