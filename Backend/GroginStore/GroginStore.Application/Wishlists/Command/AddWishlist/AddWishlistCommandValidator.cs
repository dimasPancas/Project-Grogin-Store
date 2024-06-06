using FluentValidation;

namespace GroginStore.Application.Wishlists.Command.AddWishlist;

public class AddWishlistCommandValidator : AbstractValidator<AddWishlistCommand>
{
    public AddWishlistCommandValidator()
    {
        RuleFor(x => x.ProductId)
            .NotEmpty().WithMessage("Product ID is required.")
            .NotNull().WithMessage("Product ID cannot be null.");
    }
}
