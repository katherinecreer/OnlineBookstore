import { useEffect, useState } from "react";
import { Book } from "./types/Book";

function BookList(){

    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetch("https://localhost:5000/api/Book");
            const data = await response.json();
            setBooks(data);
        };

        fetchBooks();
    }, []);

    return (
        <>
        <h1>Books</h1>
        <br />
        {books.map((m) =>
        <div id="bookCard">
            <h3>{m.title}</h3>
            <ul>
                <li>Author: {m.author}</li>
                <li>Publisher: {m.publisher}</li>
                <li>ISBN: {m.isbn}</li>
                <li>Classification: {m.classification}</li>
                <li>Category: {m.category}</li>
                <li>Page Count: {m.pageCount}</li>
                <li>Price: {m.price}</li>
            </ul>
        </div>
        )}
        </>
    );}

export default BookList;
