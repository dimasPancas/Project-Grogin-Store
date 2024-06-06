using FluentValidation;

namespace GroginStore.Application.Orders.Command.CreateOrderFromCartUser;

public class CreateOrderFromCartUserCommandValidator : AbstractValidator<CreateOrderFromCartUserCommand>
{
    public CreateOrderFromCartUserCommandValidator()
    {
        RuleFor(x => x.PaymentId)
            .NotEmpty().WithMessage("Payment ID is required.")
            .NotNull().WithMessage("Payment ID cannot be null.");

        RuleFor(x => x.AddresId)
            .NotEmpty().WithMessage("Address ID is required.")
            .NotNull().WithMessage("Address ID cannot be null.");

        RuleFor(x => x.DeliveryId)
            .NotEmpty().WithMessage("Delivery ID is required.")
            .NotNull().WithMessage("Delivery ID cannot be null.");
    }
}
