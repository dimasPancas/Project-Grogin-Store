using FluentValidation;

namespace GroginStore.Application.Carts.Command.CreateCart;

public class CreateCartCommandValidator : AbstractValidator<CreateCartCommand>
{
    public CreateCartCommandValidator()
    {
        RuleFor(data => data.ProductId).NotNull().NotEmpty();
        RuleFor(data => data.Quantity).GreaterThan(0).WithMessage("Quantity for items cart cannot be negative value or zero");
    }
}
