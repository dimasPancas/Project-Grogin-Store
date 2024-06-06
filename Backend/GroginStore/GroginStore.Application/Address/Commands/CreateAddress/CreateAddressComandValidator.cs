using FluentValidation;

namespace GroginStore.Application.Address.Commands.CreateAddress;

public class CreateAddressComandValidator : AbstractValidator<CreateAddressComand>
{
    public CreateAddressComandValidator()
    {
        RuleFor(a => a.Province).Length(5, 25).WithMessage("Province must be beetween 5 - 25 character");
        RuleFor(a => a.City).NotNull().WithMessage("City cannot null and must be beetween 5 - 20 character");
        RuleFor(a => a.Street).MaximumLength(30).WithMessage("Maximum length for Street is 30");
        RuleFor(a => a.Village).MaximumLength(20).WithMessage("Maximum length for Village is 30");
    }
}
