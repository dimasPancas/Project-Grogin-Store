using FluentValidation.TestHelper;
using Xunit;

namespace GroginStore.Application.Deliveries.Command.CreateDelivery.Tests;

public class CreateDeliveryCommandValidatorTests
{
    [Fact()]
    public void Validator_ForValidCommand_ShouldNotHaveValidationErrors()
    {
        //arrange
        var delivery = new CreateDeliveryCommand()
        {
            Name = "Test",
            Price = 15000
        };

        var validator = new CreateDeliveryCommandValidator();
        
        //act
        var result = validator.TestValidate(delivery);

        //assert
        result.ShouldNotHaveAnyValidationErrors();
    }

    [Fact()]
    public void Validator_ForInvalidCommand_ShouldHaveValidationErrors()
    {
        //arrange
        var delivery = new CreateDeliveryCommand()
        {
            Name = "these are names that are more than 20 characters long",
            Price = -3500
        };

        var validator = new CreateDeliveryCommandValidator();

        //act
        var result = validator.TestValidate(delivery);

        //assert
        result.ShouldHaveValidationErrorFor(d => d.Name);
        result.ShouldHaveValidationErrorFor(d => d.Price);
    }

    [Theory()]
    [InlineData("this delivry-1 with the length of > 20 character")]
    [InlineData("this delivry-2 with the length of > 20 character")]
    public void Validator_ForInvalidName_ShouldHaveValidationErrors(string name)
    {
        //arrange
        var validator = new CreateDeliveryCommandValidator();
        var command = new CreateDeliveryCommand { Name = name };

        //act
        var result = validator.TestValidate(command);

        //assert
        result.ShouldHaveValidationErrorFor(d => d.Name);
    }

    [Theory()]
    [InlineData(-5000)]
    [InlineData(-7000)]
    [InlineData(0)]
    public void Validator_ForInvalidPrice_ShouldHaveValidatioErrors(decimal price)
    {
        //arrange
        var validator = new CreateDeliveryCommandValidator();
        var command = new CreateDeliveryCommand { Price = price };

        //act
        var result = validator.TestValidate(command);

        //assert
        result.ShouldHaveValidationErrorFor(d => d.Price);
    }
}