namespace contactApp.Server.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string email { get; set; }
        public string? firstName { get; set; }
        public string? lastName { get; set; }
        public string passwordHash { get; set; }
    }
}
