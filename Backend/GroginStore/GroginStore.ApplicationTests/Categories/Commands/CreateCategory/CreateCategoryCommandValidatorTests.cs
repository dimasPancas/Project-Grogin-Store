using FluentValidation.TestHelper;
using Xunit;

namespace GroginStore.Application.Categories.Commands.CreateCategory.Tests;

public class CreateCategoryCommandValidatorTests
{
    [Fact()]
    public void Validator_ForValidCommand_ShoudlNotHaveValidationErrors()
    {
        //arrange
        var category = new CreateCategoryCommand()
        {
            Name = "Test",
        };

        var validator = new CreateCategoryCommandValidator();

        //act
        var result = validator.TestValidate(category);

        //assert
        result.ShouldNotHaveAnyValidationErrors();
    }

    [Fact()]
    public void Validator_ForInvalidCommand_ShoudlHaveValidationErrors()
    {
        //arrange
        var category = new CreateCategoryCommand()
        {
            Name = "this name of category with the length > 15 characters",
        };

        var validator = new CreateCategoryCommandValidator();

        //act
        var result = validator.TestValidate(category);

        //assert
        result.ShouldHaveValidationErrorFor(c => c.Name);
    }

    [Theory()]
    [InlineData("Food")]
    [InlineData("Snack")]
    [InlineData("Fruit")]
    public void Validator_ForValidName_ShouldNotHaveValidationErros(string name)
    {
        //arrange
        var validator = new CreateCategoryCommandValidator();
        var command = new CreateCategoryCommand { Name = name };

        //act
        var result = validator.TestValidate(command);

        //assert
        result.ShouldNotHaveValidationErrorFor(c => c.Name);
    }


    [Theory()]
    [InlineData("this name of category-1 with the length > 15 character")]
    [InlineData("this name of category-2 with the length > 15 character")]
    public void Validator_ForInvalidName_ShouldHaveValidationErrors(string name)
    {
        //arrange
        var validator = new CreateCategoryCommandValidator();
        var command = new CreateCategoryCommand { Name = name };

        //act
        var result = validator.TestValidate(command);

        //assert
        result.ShouldHaveValidationErrorFor(c => c.Name);
    }
}