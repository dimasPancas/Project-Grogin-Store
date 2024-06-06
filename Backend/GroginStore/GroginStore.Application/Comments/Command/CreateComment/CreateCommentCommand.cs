using GroginStore.Application.Comments.DTOs;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace GroginStore.Application.Comments.Command.CreateComment;

public class CreateCommentCommand : IRequest<CommentListDto>
{
    public string ProductId { get; set; } = default!;
    public string CommentText { get; set; } = default!;
    public string? OrderDetailId { get; set; }
    public int? Rating { get; set; }
    public IFormFile? CommentImg { get; set; }
}
