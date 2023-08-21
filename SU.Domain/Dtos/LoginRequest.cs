namespace SU.Domain.Dtos
{
    public class LoginRequest
    {
        public string? UserEmail { get; set; } = null!;
        public string? UserName { get; set; } = null!;
        public string Password { get; set; } = null!;

        //public string? RefreshToken { get; set; } = string.Empty;
        //public DateTime? TokenCreated { get; set; }
        //public DateTime? TokenExpires { get; set; }
    }
}
