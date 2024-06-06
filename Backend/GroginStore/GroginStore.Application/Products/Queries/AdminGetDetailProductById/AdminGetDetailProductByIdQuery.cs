using GroginStore.Application.Products.DTOs;
using MediatR;

namespace GroginStore.Application.Products.Queries.AdminGetDetailProductById;

public class AdminGetDetailProductByIdQuery : IRequest<ProductDetailAdminDto>
{
    public AdminGetDetailProductByIdQuery(string productId)
    {
        ProductId = productId;
    }

    public string ProductId { get; }
}
