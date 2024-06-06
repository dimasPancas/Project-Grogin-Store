using FluentValidation.TestHelper;
using Xunit;

namespace GroginStore.Application.Wishlists.Command.AddWishlist.Tests;

public class AddWishlistCommandValidatorTests
{
    [Fact()]
    public void Validator_ForValidCommand_ShouldNotHaveValidationErrors()
    {
        //arrange
        var wishlist = new AddWishlistCommand()
        {
            ProductId = "1"
        };

        var validator = new AddWishlistCommandValidator();

        //act
        var result = validator.TestValidate(wishlist);

        //assert
        result.ShouldNotHaveAnyValidationErrors();
    }

    [Fact()]
    public void Validator_ForInvalidCommand_ShouldHaveValidationErrors()
    {
        //arrange
        var wishlist = new AddWishlistCommand()
        {
            ProductId = null
        };

        var validator = new AddWishlistCommandValidator();

        //act

        var result = validator.TestValidate(wishlist);

        //assert
        result.ShouldHaveValidationErrorFor(w => w.ProductId);
    }
}