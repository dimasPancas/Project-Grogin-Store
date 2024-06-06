namespace GroginStore.Application.Comments.DTOs
{
    public class CommentListDto
    {
        public string Id { get; set; } = default!;
        public string CommentText { get; set; } = default!;
        public int? Rating { get; set; }
        public string? CommentImg { get; set; }
        public string UserName { get; set; } = default!;
        public string? UserProfile { get; set; } = default!;
        public DateTime CommentDate { get; set; }
    }
}
