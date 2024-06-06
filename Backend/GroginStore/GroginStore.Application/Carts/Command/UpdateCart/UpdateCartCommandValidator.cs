using FluentValidation;

namespace GroginStore.Application.Carts.Command.UpdateCart;

public class UpdateCartCommandValidator : AbstractValidator<UpdateCartCommand>
{
    public UpdateCartCommandValidator()
    {
        RuleFor(data => data.Quantity).GreaterThanOrEqualTo(0).WithMessage("Quantity for items cart cannot be negative value or zero");
    }
}
