using FluentValidation;

namespace GroginStore.Application.Orders.Command.CreateOrderFromProduct;

public class CreateOrderFromProductCommandValidator : AbstractValidator<CreateOrderFromProductCommand>
{
    public CreateOrderFromProductCommandValidator()
    {
        RuleFor(x => x.ProductId)
            .NotEmpty().WithMessage("Product ID is required.")
            .NotNull().WithMessage("Product ID cannot be null.");

        RuleFor(x => x.Quantity)
            .GreaterThan(0).WithMessage("Quantity must be greater than 0.");

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

