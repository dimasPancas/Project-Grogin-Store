using AutoMapper;
using GroginStore.Application.Comments.DTOs;
using GroginStore.Domain.IRepositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace GroginStore.Application.Comments.Queries.GetAllCommentByProductId
{
    public class GetAllCommentByProductIdQueryHandler : IRequestHandler<GetAllCommentByProductIdQuery, IEnumerable<CommentListDto>>
    {
        private readonly IMapper mapper;
        private readonly ICommentRepository commentRepository;
        private readonly ILogger<GetAllCommentByProductIdQueryHandler> logger;

        public GetAllCommentByProductIdQueryHandler(IMapper mapper, ILogger<GetAllCommentByProductIdQueryHandler> logger, ICommentRepository commentRepository)
        {
            this.mapper = mapper;
            this.commentRepository = commentRepository;
            this.logger = logger;
        }

        public async Task<IEnumerable<CommentListDto>> Handle(GetAllCommentByProductIdQuery request, CancellationToken cancellationToken)
        {
            logger.LogInformation($"getting all comment with productId: {request.ProductId}");
            var comments = await commentRepository.GetAllCommentsByProductId(request.ProductId);
            var result = mapper.Map<IEnumerable<CommentListDto>>(comments);
            return result;
        }
    }
}
