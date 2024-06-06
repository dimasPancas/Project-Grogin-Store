using FluentValidation;

namespace GroginStore.Application.Orders.Command.UpdatePaymentVerificationCode;

public class UpdatePaymentVerificationCodeCommandValidator : AbstractValidator<UpdatePaymentVerificationCodeCommand>
{
    public UpdatePaymentVerificationCodeCommandValidator()
    {
        RuleFor(x => x.PaymentCode)
           .NotEmpty().WithMessage("Payment code is required.")
           .Length(16).WithMessage("Payment code must be exactly 16 characters long.");
    }
}
