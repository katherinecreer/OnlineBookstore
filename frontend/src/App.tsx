import './App.css';
import { CartProvider } from './context/CartContext';
import AdminBooksPage from './pages/AdminBooksPage';
import BooksPage from './pages/BooksPage';
import CartPage from './pages/CartPage';
import CostPage from './pages/CostPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
    <CartProvider>
    <Router>
      <Routes>
        <Route path="/" element={<BooksPage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/cost/:bookId/:title/:price" element= { <CostPage />}/>
        <Route path='/cart' element={ <CartPage />} />
        <Route path='/adminbooks' element={<AdminBooksPage />} />
      </Routes>
    </Router>
    </CartProvider>
    </>
  );
}


export default App;
