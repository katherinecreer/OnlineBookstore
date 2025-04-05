import { useEffect, useState } from "react";
import { Book } from "../types/Book";
import { useNavigate } from "react-router-dom";
import { fetchBooks } from "../api/BooksAPI";
import Pagination from "./Pagination";

function BookList({selectedCategories} : {selectedCategories: string[]}){

    const [books, setBooks] = useState<Book[]>([]);
    const [pageSize, setPageSize] = useState<number>(5);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    //const [sortByTitle, setSortByTitle] = useState<boolean>(false); // Sorting state
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const loadBooks = async () => {

            try {
                setLoading(true);
                const data = await fetchBooks(pageSize, pageNum, selectedCategories);
                setBooks(data.books);
                setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
        } catch (error) {
            setError((error as Error).message);
        } finally {
            setLoading(false)
        }
    };


        loadBooks();
    }, [pageSize, pageNum, selectedCategories]);

    if (loading) return <p>Loading books...</p>;
    if (error) return <p className='text-red-500'>Error: {error}</p>;

    return (
        <>
        <br />
        <br />
        {/* <button onClick={() => {
        setSortByTitle(prev => !prev);
        setPageNum(1); // Reset to first page when sorting changes
        }}>
        Sort by Title {sortByTitle ? "(Default)" : "(A-Z)"}
        </button> */}
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

                    <button className='btn btn-success' 
                    onClick={() => navigate(`/cost/${m.bookId}/${m.title}/${m.price}`) }>
                        View More</button>

                </div>
            </div>
        )}
        <br /><br /><br />
        <Pagination
            currentPage={pageNum}
            totalPages={totalPages}
            pageSize={pageSize}
            onPageChange={setPageNum}
            onPageSizeChange={(newSize) => {
                setPageSize(newSize);
                setPageNum(1);
            }} />
        </>
    );}

export default BookList;
