using GroginStore.Application.Categories.DTOs;
using MediatR;

namespace GroginStore.Application.Categories.Queries.GetCategoryById
{
    public class GetCategoryByIdQuery : IRequest<CategoryByIdDto>
    {
        public GetCategoryByIdQuery(string id)
        {
            Id = id;
        }
        public string Id { get; set; }
    }
}
