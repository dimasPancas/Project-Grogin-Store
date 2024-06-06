using FluentValidation;

namespace GroginStore.Application.Deliveries.Command.CreateDelivery
{
    public class CreateDeliveryCommandValidator : AbstractValidator<CreateDeliveryCommand>
    {
        public CreateDeliveryCommandValidator()
        {
            RuleFor(d => d.Name).MaximumLength(20).WithMessage("Maximum length for delivery id 20 character");
            RuleFor(d => d.Price).GreaterThan(0).WithMessage("Price cannot have negative value");
        }
    }
}
