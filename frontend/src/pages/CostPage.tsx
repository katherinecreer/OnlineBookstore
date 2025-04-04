import Header from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import {useCart } from '../context/CartContext';
import { CartItem } from "../types/CartItem";
import { useState } from "react";



function CostPage() {
    const navigate = useNavigate();
    const { bookId, title } = useParams();
    const price = decodeURIComponent(useParams().price || "8.60");
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState<number>(1);

    const handleAddToCart = () => {
        const newItem: CartItem = {
        bookId: Number(bookId),
        title: title || 'No book could be found',
        price: Number(price),
        quantity: quantity};

        addToCart(newItem);
        navigate('/cart')
    };

    return (
        <>
        <Header /><br /><br /><br /><br />
        <div>
            <h4>Are you sure you want to purchase <strong>{title}</strong>?</h4><br /><br />
            <h4>Price: ${price}</h4>

            <label>
            Quantity:
            <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    style={{ marginLeft: '10px', width: '60px' }}
                />
            </label>
            <br />
            <br />
            <button onClick={(handleAddToCart)} className='btn btn-success'>Add to Cart</button>
            <br />
        </div>
        <br />
        <button onClick={() => navigate("/books")}>Go back</button>
        
        </>
    )
}

export default CostPage;