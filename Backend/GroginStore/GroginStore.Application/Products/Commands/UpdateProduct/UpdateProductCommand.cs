using GroginStore.Application.Products.DTOs;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace GroginStore.Application.Products.Commands.UpdateProduct
{
    public class UpdateProductCommand : IRequest<ProductDetailDto>
    {
        public string? Id { get; set; }
        public string Name { get; set; } = default!;
        public string Description { get; set; } = default!;
        public decimal Price { get; set; }
        public IFormFile? ImageFile { get; set; }
        //public string? ProductImage { get; set; }
        public int Stock { get; set; }
        public string? CategoryId { get; set; }
    }
}
