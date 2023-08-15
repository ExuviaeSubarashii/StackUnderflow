namespace SU.Domain.Dtos
{
    public class LoginRequest
    {
        public string? UserEmail { get; set; } = null!;
        public string? UserName { get; set; } = null!;
        public string Password { get; set; } = null!;
    }
}
