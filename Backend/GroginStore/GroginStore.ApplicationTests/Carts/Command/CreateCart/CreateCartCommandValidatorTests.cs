using FluentValidation.TestHelper;
using GroginStore.Domain.Entities;
using Xunit;
namespace GroginStore.Application.Carts.Command.CreateCart.Tests;

public class CreateCartCommandValidatorTests
{
    [Fact()]
    public void Validator_ForValidCommand_ShouldNotHaveValidationErrors()
    {
        //arrange
        var product = new Product()
        {
            Id = Guid.NewGuid(),
            Name = "Test",
        };

        var cart = new CreateCartCommand()
        {
            ProductId = product.Id.ToString(),
            Quantity = 1
        };

        var validator = new CreateCartCommandValidator();

        //act
        var result = validator.TestValidate(cart);

        //assert
        result.ShouldNotHaveAnyValidationErrors();
    }

    [Theory()]
    [InlineData(0)]
    [InlineData(-1)]
    public void Validator_ForInvalidCommand_ShouldHaveValidationErrors(int qty)
    {
        //arrange
        var cart = new CreateCartCommand()
        {
            ProductId = null,
            Quantity = qty,
        };

        var validator = new CreateCartCommandValidator();

        //act
        var result = validator.TestValidate(cart);

        //assert
        result.ShouldHaveValidationErrorFor(cart => cart.ProductId);
        result.ShouldHaveValidationErrorFor(cart => cart.Quantity);
    }
}