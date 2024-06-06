using GroginStore.Domain.Entities;
using GroginStore.Domain.Exceptions;
using GroginStore.Domain.IRepositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace GroginStore.Application.Comments.Command.DeleteComment
{
    public class DeleteCommentCommandHandler : IRequestHandler<DeleteCommentCommand>
    {
        private readonly ILogger<DeleteCommentCommandHandler> logger;
        private readonly ICommentRepository commentRepository;

        public DeleteCommentCommandHandler(ILogger<DeleteCommentCommandHandler> logger, ICommentRepository commentRepository)
        {
            this.logger = logger;
            this.commentRepository = commentRepository;
        }


        public async Task Handle(DeleteCommentCommand request, CancellationToken cancellationToken)
        {
            logger.LogInformation($"Deleting comment with id : {request.CommentId}");
            var comment = await commentRepository.GetCommentById(request.CommentId);
            if (comment == null) throw new NotFoundException(nameof(Comment), request.CommentId);
            await commentRepository.DeleteComment(comment);
        }
    }
}
