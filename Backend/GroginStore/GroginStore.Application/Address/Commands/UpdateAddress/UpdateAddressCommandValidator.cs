using FluentValidation;

namespace GroginStore.Application.Address.Commands.UpdateAddress
{
    public class UpdateAddressCommandValidator : AbstractValidator<UpdateAddressCommand>
    {
        public UpdateAddressCommandValidator()
        {
            RuleFor(a => a.Province).Length(5, 25).WithMessage("Province must be beetween 5 - 25 character");
            RuleFor(a => a.City).Length(5 - 20).WithMessage("City must be beetween 5 - 20 character");
            RuleFor(a => a.Street).MaximumLength(30).WithMessage("Maximum length for Street is 30");
            RuleFor(a => a.Village).MaximumLength(20).WithMessage("Maximum length for Village is 30");
        }
    }
}
