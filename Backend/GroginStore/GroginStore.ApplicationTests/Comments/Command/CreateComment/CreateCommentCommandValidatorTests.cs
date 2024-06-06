using FluentValidation.TestHelper;
using Xunit;
namespace GroginStore.Application.Comments.Command.CreateComment.Tests;

public class CreateCommentCommandValidatorTests
{
    [Fact()]
    public void Validator_ForValidCommand_ShouldNotHaveValidationErrors()
    {
        //arrange
        var comment = new CreateCommentCommand()
        {
            ProductId = "1",
            CommentText = "valid comment text",
            OrderDetailId = "1",
            Rating = 4
        };

        var validator = new CreateCommentCommandValidator();

        //act
        var result = validator.TestValidate(comment);

        //assert
        result.ShouldNotHaveAnyValidationErrors();
    }

    [Theory()]
    [InlineData(6)]
    [InlineData(-1)]
    public void Validator_ForInvalidCommand_ShouldHaveValidationErrors(int rating)
    {
        //arrange
        var comment = new CreateCommentCommand()
        {
            ProductId = null,
            CommentText = new string('a', 125),
            OrderDetailId = null,
            Rating = rating
        };

        var validator = new CreateCommentCommandValidator();

        //act
        var result = validator.TestValidate(comment);

        //assert
        result.ShouldHaveValidationErrorFor(c => c.ProductId);
        result.ShouldHaveValidationErrorFor(c => c.CommentText);
        result.ShouldHaveValidationErrorFor(c => c.OrderDetailId);
        result.ShouldHaveValidationErrorFor(c => c.Rating);
    }
}