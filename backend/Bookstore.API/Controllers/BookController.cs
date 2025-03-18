using Bookstore.API.Data;
using Microsoft.AspNetCore.Mvc;

namespace Bookstore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private BookDbContext _bookContext;
        
        public BookController(BookDbContext temp) => _bookContext = temp;

        [HttpGet]
        public IEnumerable<Book> Get()
        {
            var something = _bookContext.Books.ToList();
            return something;
        }
    }
}
