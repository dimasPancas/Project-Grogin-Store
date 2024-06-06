using GroginStore.Application.Common;
using GroginStore.Application.Products.DTOs;
using GroginStore.Domain.Constant;
using MediatR;

namespace GroginStore.Application.Products.Queries.AdminGetAllProduct;

public class AdminGetAllProductQuery : IRequest<PagedResult<ProductListAdminDto>>
{
    public bool? IsActive { get; set; }
    public string? search { get; set; }
    public int PageNumber { get; set; }
    public int PageSize { get; set; }
    public string? CategoryId { get; set; }
    public Guid? CategoryIdGuid { get; set;}
    public string? SortBy { get; set; }
    public SortDirection SortDirection { get; set; }
}
