using FluentValidation;

namespace GroginStore.Application.Wishlists.Command.DeleteWishlist;

public class DeleteWishlistCommandValidator : AbstractValidator<DeleteWishlistCommand>
{
    public DeleteWishlistCommandValidator()
    {
        RuleFor(x => x.Id)
           .NotEmpty().WithMessage("Product ID is required.")
           .NotNull().WithMessage("Product ID cannot be null.");
    }
}

