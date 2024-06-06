using FluentValidation.TestHelper;
using GroginStore.Domain.Constant;
using Xunit;

namespace GroginStore.Application.Vouchers.Command.CreateVoucher.Tests;

public class CreateVoucerCommandValidatorTests
{
    [Fact()]
    public void Validator_ForValidCommand_ShouldNotHaveValidationErrors()
    {
        // arrange
        var voucher = new CreateVoucerCommand()
        {
            Name = "ValidName",
            Type = VoucherType.Percentage,
            DiscountValue = 10.0m,
            MaxDiscountAmount = 50.0m,
            MaxRedemptions = 5,
            ExpiryDate = DateTime.Now.AddDays(10)
        };

        var validator = new CreateVoucerCommandValidator();

        // act
        var result = validator.TestValidate(voucher);

        // assert
        result.ShouldNotHaveAnyValidationErrors();
    }

    [Fact]
    public void Validator_ForInvalidCommand_ShouldHaveValidationErrors()
    {
        // arrange
        var voucher = new CreateVoucerCommand()
        {
            Name = new string('a', 36),  // invalid, length > 35
            Type = VoucherType.Percentage,
            DiscountValue = -10.0m,  // invalid, negative value
            MaxDiscountAmount = -50.0m,  // invalid, negative value
            MaxRedemptions = -5,  // invalid, negative value
            ExpiryDate = DateTime.Now.AddDays(-10)  // invalid, past date
        };

        var validator = new CreateVoucerCommandValidator();

        // act
        var result = validator.TestValidate(voucher);

        // assert
        result.ShouldHaveValidationErrorFor(v => v.Name);
        result.ShouldHaveValidationErrorFor(v => v.DiscountValue);
        result.ShouldHaveValidationErrorFor(v => v.MaxDiscountAmount);
        result.ShouldHaveValidationErrorFor(v => v.MaxRedemptions);
        result.ShouldHaveValidationErrorFor(v => v.ExpiryDate);
    }
}