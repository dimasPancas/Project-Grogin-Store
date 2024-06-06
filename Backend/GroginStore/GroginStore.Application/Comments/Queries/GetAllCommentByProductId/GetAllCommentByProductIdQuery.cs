using GroginStore.Application.Comments.DTOs;
using MediatR;

namespace GroginStore.Application.Comments.Queries.GetAllCommentByProductId
{
    public class GetAllCommentByProductIdQuery : IRequest<IEnumerable<CommentListDto>>
    {
        public GetAllCommentByProductIdQuery(string productId)
        {
            ProductId = productId;
        }

        public string ProductId { get; }
    }
}
