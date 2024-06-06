using FluentAssertions;
using FluentValidation.TestHelper;
using GroginStore.Domain.Entities;
using Xunit;

namespace GroginStore.Application.Products.Commands.CreateProduct.Tests;

public class CreateProductCommandValidatorTests
{
    [Fact()]
    public void Validator_ForValidCommand_ShouldNotHaveValidationErrors()
    {
        //arrange
        var category = new Category()
        {
            Id = Guid.NewGuid(),
            Name = "test"
        };

        var product = new CreateProductCommand()
        {
            Name = "Product-a",
            Description = "Valid Description",
            Price = 1,
            Stock = 1,
            CategoryId = category.Id
        };

        var validator = new CreateProductCommandValidator();

        //act
        var result = validator.TestValidate(product);

        //assert
        result.ShouldNotHaveAnyValidationErrors();
    }

    [Fact()]
    public void Validator_ForInvalidCommand_ShouldHaveValidationErrors()
    {
        //arrange
        var product = new CreateProductCommand()
        {
            Name = "A",
            Description = new string('a', 126),
            Price = -1,
            Stock = -1,
        };

        var validator = new CreateProductCommandValidator();

        //act
        var result = validator.TestValidate(product);

        //assert
        result.ShouldHaveValidationErrorFor(p => p.Name);
        result.ShouldHaveValidationErrorFor(p => p.Description);
        result.ShouldHaveValidationErrorFor(p => p.Price);
        result.ShouldHaveValidationErrorFor(p => p.Stock);

    }
}