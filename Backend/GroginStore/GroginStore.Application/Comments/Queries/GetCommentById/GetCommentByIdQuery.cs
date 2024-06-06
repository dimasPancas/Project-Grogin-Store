using GroginStore.Application.Comments.DTOs;
using MediatR;

namespace GroginStore.Application.Comments.Queries.GetCommentById
{
    public class GetCommentByIdQuery : IRequest<CommentListDto>
    {
        public GetCommentByIdQuery(string id)
        {
            Id = id;
        }

        public string Id { get; }
    }
}
