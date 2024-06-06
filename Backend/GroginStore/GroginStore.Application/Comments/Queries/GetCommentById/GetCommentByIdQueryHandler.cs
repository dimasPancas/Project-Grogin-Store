using AutoMapper;
using GroginStore.Application.Comments.DTOs;
using GroginStore.Domain.Entities;
using GroginStore.Domain.Exceptions;
using GroginStore.Domain.IRepositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace GroginStore.Application.Comments.Queries.GetCommentById
{
    public class GetCommentByIdQueryHandler : IRequestHandler<GetCommentByIdQuery, CommentListDto>
    {
        private readonly ILogger<GetCommentByIdQueryHandler> logger;
        private readonly ICommentRepository commentRepository;
        private readonly IMapper mapper;

        public GetCommentByIdQueryHandler(ILogger<GetCommentByIdQueryHandler> logger, ICommentRepository commentRepository, IMapper mapper)
        {
            this.logger = logger;
            this.commentRepository = commentRepository;
            this.mapper = mapper;
        }

        public async Task<CommentListDto> Handle(GetCommentByIdQuery request, CancellationToken cancellationToken)
        {
            logger.LogInformation($"Getting comment product by id {request.Id}");
            var comment = await commentRepository.GetCommentById(request.Id.ToString()) ?? throw new NotFoundException(nameof(Comment), request.Id.ToString());
            var result = mapper.Map<CommentListDto>(comment);
            return result;
        }
    }
}
