using FluentValidation.TestHelper;
using Xunit;

namespace GroginStore.Application.Orders.Command.CreateOrderFromCartUser.Tests;

public class CreateOrderFromCartUserCommandValidatorTests
{
    [Fact()]
    public void Validator_ForValidCommand_ShouldNotHaveValidationErrors()
    {
        //arrange
        var order = new CreateOrderFromCartUserCommand()
        {
            PaymentId = "1",
            AddresId = "1",
            DeliveryId = "1",
        };

        var validator = new CreateOrderFromCartUserCommandValidator();

        //act
        var result = validator.TestValidate(order);

        //assert
        result.ShouldNotHaveAnyValidationErrors();
    }

    [Fact()]
    public void Validator_ForInvalidCommand_ShouldHaveValidationErrors()
    {
        //arrange
        var order = new CreateOrderFromCartUserCommand()
        {
            PaymentId = null,
            AddresId = null,
            DeliveryId = null,
        };

        var validator = new CreateOrderFromCartUserCommandValidator();

        //act
        var result = validator.TestValidate(order);

        //assert
        result.ShouldHaveValidationErrorFor(o => o.PaymentId);
        result.ShouldHaveValidationErrorFor(o => o.AddresId);
        result.ShouldHaveValidationErrorFor(o => o.DeliveryId);
    }
}