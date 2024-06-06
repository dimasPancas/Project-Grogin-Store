using FluentValidation;

namespace GroginStore.Application.Comments.Command.CreateComment;

public class CreateCommentCommandValidator : AbstractValidator<CreateCommentCommand>
{
    public CreateCommentCommandValidator()
    {
        RuleFor(x => x.CommentText)
            .NotEmpty().WithMessage("Comment text is required.")
            .MaximumLength(100).WithMessage("Comment text cannot exceed 100 characters.");
        RuleFor(x => x.Rating).InclusiveBetween(1, 5).WithMessage("rating for product must be between 1 and 5");
        RuleFor(x => x.ProductId).NotNull().NotEmpty();
        RuleFor(x => x.OrderDetailId).NotNull().NotEmpty();
    }
}
