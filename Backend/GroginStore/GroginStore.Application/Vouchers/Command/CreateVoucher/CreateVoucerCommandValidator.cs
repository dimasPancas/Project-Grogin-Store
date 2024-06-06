using FluentValidation;
using GroginStore.Domain.Constant;

namespace GroginStore.Application.Vouchers.Command.CreateVoucher;

public class CreateVoucerCommandValidator : AbstractValidator<CreateVoucerCommand>
{
    public CreateVoucerCommandValidator()
    {
        RuleFor(v => v.Name)
           .MaximumLength(35)
           .WithMessage("Name must be at most 35 characters long.").NotNull().WithMessage("Name voucher cannot null");

        RuleFor(v => v.DiscountValue)
            .GreaterThan(0)
            .When(v => v.Type == VoucherType.Percentage || v.Type == VoucherType.Fixed)
            .WithMessage("Discount value must be greater than zero for Percentage and Fixed voucher types.");

        RuleFor(v => v.MaxDiscountAmount)
            .GreaterThan(0)
            .When(v => v.Type == VoucherType.Percentage || v.Type == VoucherType.Fixed)
            .WithMessage("Max discount amount must be greater than zero for Percentage and Fixed voucher types.");

        RuleFor(v => v.MaxRedemptions)
            .GreaterThan(0)
            .WithMessage("Max redemptions must be greater than zero.");

        RuleFor(v => v.ExpiryDate)
            .GreaterThan(DateTime.Now)
            .WithMessage("The expiration date must be later than the current time.");

        RuleFor(v => v.Type)
            .IsInEnum()
            .WithMessage("Invalid voucher type.");
    }
}
