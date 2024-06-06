using FluentValidation;
namespace GroginStore.Application.Categories.Commands.CreateCategory;

public class CreateCategoryCommandValidator : AbstractValidator<CreateCategoryCommand>
{
    public CreateCategoryCommandValidator()
    {
        RuleFor(p => p.Name).MaximumLength(15).WithMessage("Maximum character for Category name is 15");
    }
}
