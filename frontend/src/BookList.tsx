import { useEffect, useState } from "react";
import { Book } from "./types/Book";

function BookList({selectedCategories} : {selectedCategories: string[]}){

    const [books, setBooks] = useState<Book[]>([]);
    const [pageSize, setPageSize] = useState<number>(5);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [sortByTitle, setSortByTitle] = useState<boolean>(false); // Sorting state



    useEffect(() => {
        const fetchBooks = async () => {

            const categoryParams = selectedCategories
            .map((cat) => `bookTypes=${encodeURIComponent(cat)}`)
            .join(`&`);

            const response = await fetch(
            `https://localhost:5000/api/Book/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}&sortByTitleAsc=${sortByTitle}${selectedCategories.length ? `&${categoryParams}` : ''}`);
            const data = await response.json();
            setBooks(data.books);
            setTotalItems(data.totalNumBooks);
            setTotalPages(Math.ceil(totalItems / pageSize));
        };

        fetchBooks();
    }, [pageSize, pageNum, totalItems, sortByTitle, selectedCategories]);

    return (
        <>
        <br />
        <br />
        <button onClick={() => {
        setSortByTitle(prev => !prev);
        setPageNum(1); // Reset to first page when sorting changes
        }}>
        Sort by Title {sortByTitle ? "(Default)" : "(A-Z)"}
        </button>
        <br />
        <br />
        <br /> 
        {books.map((m) =>
            <div id="bookCard" className="card" key={m.bookId}>
                <h3 className="card-title">{m.title}</h3> 
                <div className="card-body">
                    <ul className="list-unstyled"> 
                        <li><strong>Author:</strong> {m.author}</li>
                        <li><strong>Publisher:</strong> {m.publisher}</li>
                        <li><strong>ISBN:</strong> {m.isbn}</li>
                        <li><strong>Classification:</strong> {m.classification}</li>
                        <li><strong>Category:</strong> {m.category}</li>
                        <li><strong>Page Count:</strong> {m.pageCount}</li>
                        <li><strong>Price:</strong> ${m.price}</li>
                     </ul>
                </div>
            </div>
        )}
        <br />
        <button disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>Previous</button>

        {[...Array(totalPages)].map((_, i) => (
            <button key={i + 1} onClick={() => setPageNum(i + 1)} disabled={pageNum === (i + 1)}>
                {i + 1}
            </button>
        ))}

        <button disabled={pageNum === totalPages} onClick={() => setPageNum(pageNum + 1)}>Next</button>    

        <br />
        <br />
        <label>
            <p>Results per page:</p>
            <select value={pageSize} onChange={(p) => {
                setPageSize(Number(p.target.value));
                setPageNum(1);}}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>

            </select>
        </label>
        </>
    );}

export default BookList;
