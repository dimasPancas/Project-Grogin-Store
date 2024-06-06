using FluentValidation;

namespace GroginStore.Application.Payments.Commands.CreatePayment
{
    public class CreatePaymentCommandValidator : AbstractValidator<CreatePaymentCommand>
    {
        public CreatePaymentCommandValidator()
        {
            RuleFor(p => p.Name).MaximumLength(15).WithMessage("Category must be name character between 5 - 15");
            RuleFor(p => p.PaymentCost).GreaterThan(0).WithMessage("Pyament cost cannot have negative value");
        }
    }
}
