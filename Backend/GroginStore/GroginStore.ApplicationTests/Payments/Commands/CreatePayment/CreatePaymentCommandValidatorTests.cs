using FluentValidation.TestHelper;
using Xunit;


namespace GroginStore.Application.Payments.Commands.CreatePayment.Tests;

public class CreatePaymentCommandValidatorTests
{
    [Fact()]
    public void Validator_ForValidCommand_ShouldNotHaveValidationErrors()
    {
        //arrange
        var payment = new CreatePaymentCommand()
        {
            Name = "Test",
            PaymentCost = 1
        };

        var validator = new CreatePaymentCommandValidator();

        //act
        var result = validator.TestValidate(payment);

        //assert
        result.ShouldNotHaveAnyValidationErrors();
    }

    [Fact()]
    public void Validator_ForInvalidCommand_ShouldHaveValidationErrors()
    {
        //arrange
        var payment = new CreatePaymentCommand()
        {
            Name = "this is name with the length > 15 character",
            PaymentCost = -1         ///negative value
        };

        var validator = new CreatePaymentCommandValidator();

        //act
        var result = validator.TestValidate(payment);

        //assert
        result.ShouldHaveValidationErrorFor(p => p.Name);
        result.ShouldHaveValidationErrorFor(p => p.PaymentCost);
    }


    [Theory()]
    [InlineData("this payment-1 with the length of > 15 character")]
    [InlineData("this payment-2 with the length of > 15 character")]
    public void Validator_ForInvalidName_ShouldHaveValidationErrors(string name)
    {
        //arrange
        var validator = new CreatePaymentCommandValidator();
        var command = new CreatePaymentCommand { Name = name };

        //act
        var result = validator.TestValidate(command);

        //assert
        result.ShouldHaveValidationErrorFor(d => d.Name);
    }

    [Theory()]
    [InlineData(-5000)]
    [InlineData(0)]
    public void Validator_ForInvalidPaymentCost_ShouldHaveValidatioErrors(decimal paymentCost)
    {
        //arrange
        var validator = new CreatePaymentCommandValidator();
        var command = new CreatePaymentCommand { PaymentCost = paymentCost };

        //act
        var result = validator.TestValidate(command);

        //assert
        result.ShouldHaveValidationErrorFor(p => p.PaymentCost);
    }
}