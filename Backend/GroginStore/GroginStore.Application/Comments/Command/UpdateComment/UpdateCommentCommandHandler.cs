using AutoMapper;
using GroginStore.Application.Comments.DTOs;
using GroginStore.Application.Common;
using GroginStore.Domain.Entities;
using GroginStore.Domain.Exceptions;
using GroginStore.Domain.IRepositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace GroginStore.Application.Comments.Command.UpdateComment;

public class UpdateCommentCommandHandler : IRequestHandler<UpdateCommentCommand, CommentListDto?>
{
    private readonly IMapper mapper;
    private readonly ILogger<UpdateCommentCommandHandler> logger;
    private readonly ICommentRepository commentRepository;
    private readonly IFileService fileService;

    public UpdateCommentCommandHandler(IMapper mapper, ILogger<UpdateCommentCommandHandler> logger,
        ICommentRepository commentRepository, IFileService fileService)
    {
        this.mapper = mapper;
        this.logger = logger;
        this.commentRepository = commentRepository;
        this.fileService = fileService;
    }

    public async Task<CommentListDto?> Handle(UpdateCommentCommand request, CancellationToken cancellationToken)
    {
        string[] allowedFileExtensions = [".jpg", ".jpeg", ".png"];
        logger.LogInformation($"Updating comment with id: {request.Id} ");
        var comment = await commentRepository.GetCommentById(request.Id!) ?? throw new NotFoundException(nameof(Comment), request.Id!);

        string? imgPath = null;
        if (request.CommentImg != null)
        {
            if (comment.CommentImg != null) fileService.DeleteFile(comment.CommentImg);
            imgPath = await fileService.SaveFileAsync(request.CommentImg, allowedFileExtensions);
        }

        mapper.Map(request, comment);

        comment.CommentImg = imgPath;
        await commentRepository.SaveChanges();
        
        var result = mapper.Map<CommentListDto>(comment);
        return result;

    }
}
