namespace SU.Domain.Dtos
{
    public class UserAuthDto
    {
        public string? UserName { get; set; } = null;
        public string? EncPassword { get; set; } = null;
        public string? EncEmail { get; set; } = null;
        public string? Token { get; set; } = string.Empty;
    }
}
