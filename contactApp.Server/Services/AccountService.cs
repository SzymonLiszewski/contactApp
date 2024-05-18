using contactApp.Server.Models;
using contactApp.Server.Entities;
using Microsoft.AspNetCore.Identity;
using contactApp.Server.Exceptions;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;

namespace contactApp.Server.Services
{
    public interface IAccountService 
    {
        void RegisterUser(RegisterUserDto dto);
        string GenerateJwt(LoginDto dto);
    }
    public class AccountService : IAccountService
    {
        private readonly ContactsContext _context;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly AuthenticationSettings _authenticationSettings;
        public AccountService(ContactsContext context, IPasswordHasher<User> passwordHasher, AuthenticationSettings authenticationSettings) {
            _context = context;
            _passwordHasher = passwordHasher;
            _authenticationSettings = authenticationSettings;
        }

        public string GenerateJwt(LoginDto dto)
        {
            var user = _context.Users.FirstOrDefault(u=>
                u.email == dto.email
            );
            if (user is null) 
            {
                throw new BadRequestException("Incorrect email or password");
            }
            var result = _passwordHasher.VerifyHashedPassword(user, user.passwordHash, dto.password);
            if(result == PasswordVerificationResult.Failed)
            {
                throw new BadRequestException("Incorrect email or password");
            }
            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, $"{user.firstName} {user.lastName}"),
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_authenticationSettings.JwtKey));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expire = DateTime.Now.AddDays(_authenticationSettings.JwtExpireDays);

            var token = new JwtSecurityToken(
                _authenticationSettings.JwtIssuer,
                _authenticationSettings.JwtIssuer,
                claims,
                expires: expire,
                signingCredentials: credentials);

            var tokenHandler = new JwtSecurityTokenHandler();
            return tokenHandler.WriteToken(token);
        }

        public void RegisterUser(RegisterUserDto dto)
        {
            var newUser = new User()
            {
                email = dto.email,
                firstName = dto.firstName,
                lastName = dto.lastName,
            };
            var hashedPassword = _passwordHasher.HashPassword(newUser, dto.password);
            newUser.passwordHash = hashedPassword;
            _context.Users.Add(newUser);
            _context.SaveChanges();
        }
    }
}
