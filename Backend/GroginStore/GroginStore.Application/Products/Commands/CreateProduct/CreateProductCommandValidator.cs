using FluentValidation;

namespace GroginStore.Application.Products.Commands.CreateProduct;

public class CreateProductCommandValidator : AbstractValidator<CreateProductCommand>
{
    public CreateProductCommandValidator()
    {
        RuleFor(data => data.Name).Length(5, 25).WithMessage("Product must be name character between 5 - 25");
        RuleFor(data => data.Description).MaximumLength(125).WithMessage("The maximum length for description is 125");
        RuleFor(data => data.Stock).GreaterThan(0).WithMessage("Stock cannot have negative value");
        RuleFor(data => data.Price).GreaterThan(0).WithMessage("Price cannot have negative value");
    }
}
