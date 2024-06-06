using FluentValidation;

namespace GroginStore.Application.Categories.Commands.UpdateCategory
{
    public class UpdateCategoryCommandValidator : AbstractValidator<UpdateCategoryCommand>
    {
        public UpdateCategoryCommandValidator()
        {
            RuleFor(p => p.Name).MaximumLength(15).WithMessage("Maximum character for Category name is 15");
        }
    }
}
