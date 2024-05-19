using FluentValidation;

namespace contactApp.Server.Models.Validators
{
    public class ContactValidator : AbstractValidator<Contacts>
    {
        private readonly ContactsContext _context;
        public ContactValidator(ContactsContext context)
        {
            _context = context;
            RuleFor(x => x.email)
                .NotEmpty()
                .EmailAddress();
            RuleFor(x => x.password)
                .MinimumLength(8)
                .Matches("[A-Z]").WithMessage("Password must contain at least one uppercase letter.")
                .Matches("[a-z]").WithMessage("Password must contain at least one lowercase letter.")
                .Matches("[0-9]").WithMessage("Password must contain at least one number.")
                .Matches("[^a-zA-Z0-9]").WithMessage("Password must contain at least one special character.");

            RuleFor(x => x.email)
                .Custom((value, context) =>
                {
                    var userId = ((Contacts)context.InstanceToValidate).Id;
                    var isInUse = _context.Contacts.Any(u => u.email == value && u.Id != userId);
                    if (isInUse)
                    {
                        context.AddFailure("Email", "User with that email address is already registered");
                    }
                });
            RuleFor(x => x.dateOfBirth)
             .Matches(@"^\d{4}-\d{2}-\d{2}$").WithMessage("Wrong date format, use yyyy-mm-dd");

            RuleFor(x => x.phoneNumber)
            .NotEmpty().WithMessage("Phone number is required.")
            .Matches(@"^\+?[1-9]\d{1,14}$").WithMessage("Phone number is not valid. It must be a valid international phone number.");
        }
        private bool BeAValidDate(DateOnly? date)
        {
            return date.HasValue && date.Value != default(DateOnly);
        }
    }
}
