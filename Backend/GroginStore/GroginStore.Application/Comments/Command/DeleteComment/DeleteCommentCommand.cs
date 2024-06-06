using MediatR;

namespace GroginStore.Application.Comments.Command.DeleteComment
{
    public class DeleteCommentCommand : IRequest
    {
        public DeleteCommentCommand(string commentId)
        {
            CommentId = commentId;
        }

        public string CommentId { get; }
    }
}
