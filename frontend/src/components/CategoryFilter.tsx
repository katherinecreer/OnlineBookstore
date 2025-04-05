import { useEffect, useState } from "react";
import './CategoryFilter.css'
import { API_URL } from "../api/BooksAPI"


function CategoryFilter ({
    selectedCategories,
    setSelectedCategories,
}: {
    selectedCategories: string[];
    setSelectedCategories: (categories: string[]) => void;}) 
    {
    
    const [categories, setCategories] = useState<string[]>([]);
    
    useEffect(() => {
        const fetchCategories = async () => {
            try {
            const response = await fetch (`${API_URL}/GetBookCategory`);
            const data = await response.json();
            setCategories(data);
            }
            catch (error) {
            console.error('Error fetching categories', error);
            }
        }

        fetchCategories()
    }, []); //error handling inclueded

    function handleCheckboxChange ({target} : {target : HTMLInputElement}) {
        const updatedCategories = selectedCategories.includes(target.value) 
        ? selectedCategories.filter(x => x !== target.value) 
        : [...selectedCategories, target.value];
        
        setSelectedCategories(updatedCategories);
    }
    
    return (
        <div className="category-filter">
            <h5>Book Categories</h5>
            <div className='category-list'>
                {categories.map((c) => (
                    <div key={ c } className='category-item'>
                        <input type="checkbox" id={c} value={c} className='category-checkbox'
                        onChange= {handleCheckboxChange} />
                        <label htmlFor={c}>{c}</label>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoryFilter;