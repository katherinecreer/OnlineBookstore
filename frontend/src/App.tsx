import {useState } from 'react';
import './App.css';
import BookList from './BookList';
import CategoryFilter from './CategoryFilter';
import Header from './Header';

function App() {

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <>
      <div className='container'>
        <div className='row'>
          <Header />
        </div>
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
    </>
  );
}

export default App;
