using AutoMapper;
using GroginStore.Application.Comments.DTOs;
using GroginStore.Application.Common;
using GroginStore.Application.Users;
using GroginStore.Domain.Entities;
using GroginStore.Domain.IRepositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace GroginStore.Application.Comments.Command.CreateComment;

public class CreateCommentCommandHandler : IRequestHandler<CreateCommentCommand, CommentListDto>
{
    private readonly ILogger<CreateCommentCommandHandler> logger;
    private readonly IMapper mapper;
    private readonly IUserContext userContext;
    private readonly ICommentRepository commentRepository;
    private readonly IFileService fileService;

    public CreateCommentCommandHandler(ILogger<CreateCommentCommandHandler> logger, IMapper mapper,
        IUserContext userContext, ICommentRepository commentRepository, IFileService fileService)
    {
        this.logger = logger;
        this.mapper = mapper;
        this.userContext = userContext;
        this.commentRepository = commentRepository;
        this.fileService = fileService;
    }


    public async Task<CommentListDto> Handle(CreateCommentCommand request, CancellationToken cancellationToken)
    {
        string[] allowedFileExtensions = [".jpg", ".jpeg", ".png"];
        logger.LogInformation($"Creating new comment in productId: {request.ProductId}");
        var user = userContext.GetCurrentUser();

        string? imgPath = null;
        if (request.CommentImg != null) imgPath = await fileService.SaveFileAsync(request.CommentImg, allowedFileExtensions);

        var commentModel = mapper.Map<Comment>(request);
        commentModel.UserId = user!.Id;
        commentModel.CommentImg = imgPath;
        commentModel.CommentDate = DateTime.Now;

        var comment = await commentRepository.CreateComment(commentModel);
        var result = mapper.Map<CommentListDto>(comment);
        return result;
    }
}
