import { useState } from 'react';
import CategoryFilter from '../components/CategoryFilter';
import BookList from '../components/BookList';
import Header from '../components/Header';
import CartSummary from '../components/CartSummary';

function BooksPage () {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    return (
        <div className='container mt-4'>
            <CartSummary />
            <Header />
          <div className='row'>
            <div className='col-md-4'>
              <CategoryFilter 
              selectedCategories={selectedCategories} 
              setSelectedCategories={setSelectedCategories}/>
            </div>
            <div className='col-md-8'>
              <BookList selectedCategories={selectedCategories}/>
            </div>
          </div>
        </div>
    );
}

export default BooksPage;