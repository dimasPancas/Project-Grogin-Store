using FluentValidation.TestHelper;
using Xunit;

namespace GroginStore.Application.Address.Commands.CreateAddress.Tests;

public class CreateAddressComandValidatorTests
{
    [Fact()]
    public void Validator_ForValidCommand_ShouldNotHaveValidationErrors()
    {
        //arrange
        var address = new CreateAddressComand()
        {
            Province = "DKI Jakarta",
            City = "Cakung",
            PostalCode = 11111,
            Village = "village",
            Street = "street"
        };

        var validator = new CreateAddressComandValidator();

        //act
        var result = validator.TestValidate(address);

        //assert
        result.ShouldNotHaveAnyValidationErrors();
    }

    [Fact()]
    public void Validator_ForInvalidCommand_ShouldHaveValidationErrors()
    {
        //arrange
        var address = new CreateAddressComand()
        {
            Province = "A",
            //City = "",
            Street = new string('a', 50),
            PostalCode = 1,
            Village = new string('a', 50),
        };

        var validator = new CreateAddressComandValidator();

        //act
        var result = validator.TestValidate(address);

        //assert
        result.ShouldHaveValidationErrorFor(a => a.Province);
        result.ShouldHaveValidationErrorFor(a => a.City);
        result.ShouldHaveValidationErrorFor(a => a.Street);
        result.ShouldHaveValidationErrorFor(a => a.Village);
    }
}