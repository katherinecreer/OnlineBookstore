import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';
function CartPage () {
    const navigate = useNavigate();
    const { cart, removeFromCart } = useCart();
    // Calculate total price
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    
    return (
        <div>
            <h2 className="mb-4 text-center">Current Cart</h2>
            <div>
                {cart.length === 0 ? (
                <p>Your cart is currently empty.</p>):
                (<ul>
                    {cart.map((item: CartItem) => (
                        <li key={item.bookId}>
                            {item.title} ({item.quantity}): ${(item.price * item.quantity).toFixed(2)}
                            <button onClick={() => removeFromCart(item.bookId)} className="btn btn-primary" 
                            style={{ marginLeft:'10px',marginBottom: "15px", padding: '0.2rem 0.4rem', fontSize: '0.8rem' }}>Remove</button>
                        </li>
                    ))}
                </ul>)}
            </div>
            <h3> Total: ${totalPrice} </h3>
            <button>Checkout</button>
            <button onClick={() => navigate('/books')}>Continue Browsing</button>
        </div>
    )
}

export default CartPage