using GroginStore.Application.Products.DTOs;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace GroginStore.Application.Products.Commands.CreateProduct;

public class CreateProductCommand : IRequest<ProductDto>
{
    public string Name { get; set; } = default!;
    public string? Description { get; set; }
    public decimal Price { get; set; }
    public IFormFile? ImageFile { get; set; }
    //public string? ProductImage {  get; set; }
    public int Stock { get; set; }
    public Guid CategoryId { get; set; }
}
