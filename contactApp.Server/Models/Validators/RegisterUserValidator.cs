using FluentValidation;

namespace contactApp.Server.Models.Validators
{
    public class RegisterUserValidator : AbstractValidator<RegisterUserDto>
    {
        private readonly ContactsContext _context;
        public RegisterUserValidator(ContactsContext context)
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
                    var isInUse = _context.Users.Any(u => u.email == value);
                    if (isInUse)
                    {
                        context.AddFailure("Email", "User with that email adress is already registered");
                    }
                });
        }
    }
}
