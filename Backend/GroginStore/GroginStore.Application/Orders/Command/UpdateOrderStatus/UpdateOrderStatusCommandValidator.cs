using FluentValidation;

namespace GroginStore.Application.Orders.Command.UpdateOrderStatus;

public class UpdateOrderStatusCommandValidator : AbstractValidator<UpdateOrderStatusCommand>
{
    public UpdateOrderStatusCommandValidator()
    {
        RuleFor(data => data.OrderStatus).InclusiveBetween(1, 5).WithMessage("Order status must be between 1 and 5");
    }
}
