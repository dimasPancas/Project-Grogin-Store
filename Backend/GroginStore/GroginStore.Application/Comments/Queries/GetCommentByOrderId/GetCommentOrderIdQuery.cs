using GroginStore.Application.Comments.DTOs;
using MediatR;

namespace GroginStore.Application.Comments.Queries.GetCommentByOrderId;

public class GetCommentOrderIdQuery : IRequest<CommentListDto>
{
    public GetCommentOrderIdQuery(string orderId)
    {
        OrderId = orderId;
    }

    public string OrderId { get; }
}
