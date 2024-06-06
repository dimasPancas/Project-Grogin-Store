using FluentValidation;

namespace GroginStore.Application.Payments.Commands.UpdatePayment
{
    public class UpdatePaymentCommandValidator : AbstractValidator<UpdatePaymentCommand>
    {
        public UpdatePaymentCommandValidator()
        {
            RuleFor(p => p.Name).MaximumLength(15).WithMessage("Category must be name character between 5 - 15");
            RuleFor(p => p.PaymentCost).GreaterThan(0).WithMessage("Pyament cost cannot have negative value");
        }
    }
}
