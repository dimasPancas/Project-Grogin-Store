using FluentValidation;

namespace GroginStore.Application.Deliveries.Command.UpdateDelivery
{
    public class UpdateDeliveryCommandValidator : AbstractValidator<UpdateDeliveryCommand>
    {
        public UpdateDeliveryCommandValidator()
        {
            RuleFor(d => d.Name).MaximumLength(20).WithMessage("Maximum length for delivery id 20 character");
            RuleFor(d => d.Price).GreaterThanOrEqualTo(0).WithMessage("Price cannot have negative value");
        }
    }
}
