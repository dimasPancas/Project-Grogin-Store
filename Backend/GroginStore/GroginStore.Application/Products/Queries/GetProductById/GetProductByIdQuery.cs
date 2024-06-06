using GroginStore.Application.Products.DTOs;
using MediatR;

namespace GroginStore.Application.Products.Queries.GetProductById
{
    public class GetProductByIdQuery : IRequest<ProductDetailDto>
    {
        public GetProductByIdQuery(string id)
        {
            Id = id;
        }
        public string Id { get; set; }
    }
}
