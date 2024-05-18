using System.ComponentModel.DataAnnotations;

namespace contactApp.Server.Models
{
    public class RegisterUserDto
    {
        public string email { get; set; }
        public string? firstName { get; set; }
        public string? lastName { get; set; }
        public string password { get; set; }
    }
}
