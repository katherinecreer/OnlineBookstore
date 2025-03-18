using System.ComponentModel.DataAnnotations;

namespace Bookstore.API.Data;

public class Book
{
    [Key]
    public int BookId { get; set; }
    [Required]
    public required string Title { get; set; }
    public string? Author { get; set; }
    public string? Publisher { get; set; }
    public string? Isbn { get; set; }
    public string? Classification { get; set; }
    public string? Category { get; set; }
    public int? PageCount { get; set; }
    public int? Price { get; set; }
}