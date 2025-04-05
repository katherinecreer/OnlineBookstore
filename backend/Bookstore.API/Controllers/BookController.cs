using Bookstore.API.Data;
using Microsoft.AspNetCore.Mvc;
// Ensure LINQ is imported


namespace Bookstore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly BookDbContext _bookContext;
        //setting instance of the controller
        public BookController(BookDbContext temp) => _bookContext = temp;

        //Get Method that is used with the API call
        [HttpGet("AllBooks")]
        public IActionResult Get(int pageSize = 5, int pageNum = 1, bool sortByTitleAsc = false, [FromQuery] List<string>? bookTypes = null)
        {
            var query = _bookContext.Books.AsQueryable();

            //Apply sorting if requested
            if (sortByTitleAsc)
            {
                query = query.OrderBy(b => b.Title);
            }

            if (bookTypes != null && bookTypes.Any())
            {
                query = query.Where(b => bookTypes.Contains(b.Category));
            
            }
            
            var totalNumBooks = query.Count();

            // Apply pagination after sorting
            var books = query
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();
            
            //returning all the DATA!
            return Ok(new
            {
                Books = books,
                TotalNumBooks = totalNumBooks
            });
        }

        //The call in order to get Book Category Data
        [HttpGet("GetBookCategory")]
        public IActionResult GetBookCategory ()
        {
            var bookCategory = _bookContext.Books
                .Select(b => b.Category) 
                .Distinct()
                .ToList();

            return Ok(bookCategory);
        }

        [HttpPost("AddBook")]
        public IActionResult AddBook([FromBody] Book newBook)
        {
            _bookContext.Books.Add(newBook);
            _bookContext.SaveChanges();
            return Ok();
        }

        [HttpPut("UpdateBook/{bookId}")]
        public IActionResult UpdateBook(int bookId, [FromBody] Book updatedBook)
        {
            var existingBook = _bookContext.Books.Find(bookId);
            
            existingBook.Title = updatedBook.Title;
            existingBook.Author = updatedBook.Author;
            existingBook.Publisher = updatedBook.Publisher;
            existingBook.Isbn = updatedBook.Isbn;
            existingBook.Classification = updatedBook.Classification;
            existingBook.Category = updatedBook.Category;
            existingBook.PageCount = updatedBook.PageCount;
            existingBook.Price = updatedBook.Price;
            
            _bookContext.Books.Update(existingBook);
            _bookContext.SaveChanges();
            
            return Ok(existingBook);
        }
    
        [HttpDelete("DeleteBook/{bookId}")]
        public IActionResult DeleteBook(int bookId)
        {
            var book = _bookContext.Books.Find(bookId);

            if (book == null)
            {
                return NotFound(new {message = "Book not found"});
            }
            
            _bookContext.Books.Remove(book);
            _bookContext.SaveChanges();
            
            return NoContent();
        }
        
    }
}
