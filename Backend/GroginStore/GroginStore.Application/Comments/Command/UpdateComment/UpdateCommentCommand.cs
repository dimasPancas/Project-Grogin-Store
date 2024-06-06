using GroginStore.Application.Comments.DTOs;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace GroginStore.Application.Comments.Command.UpdateComment;

public class UpdateCommentCommand : IRequest<CommentListDto?>
{
    public string? Id { get; set; }
    public string CommentText { get; set; } = default!;
    public int? Rating { get; set; }
    public IFormFile? CommentImg { get; set; }
}
