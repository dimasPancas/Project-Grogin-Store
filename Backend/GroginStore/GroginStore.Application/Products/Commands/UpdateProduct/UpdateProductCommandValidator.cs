using FluentValidation;

namespace GroginStore.Application.Products.Commands.UpdateProduct
{
    public class UpdateProductCommandValidator : AbstractValidator<UpdateProductCommand>
    {
        public UpdateProductCommandValidator()
        {
            RuleFor(data => data.Name).Length(5, 25).WithMessage("Product must be name character between 5 - 25");
            RuleFor(data => data.Description).MaximumLength(125).WithMessage("The maximum length for description is 125");
            RuleFor(data => data.Stock).GreaterThanOrEqualTo(0).WithMessage("Stock cannot have negative value");
            RuleFor(data => data.Price).GreaterThanOrEqualTo(0).WithMessage("Price cannot have negative value");
        }
    }
}
