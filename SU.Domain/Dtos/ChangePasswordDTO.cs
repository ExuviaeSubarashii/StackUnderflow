namespace SU.Domain.Dtos
{
    public class ChangePasswordDTO
    {
        public int Id { get; set; }
        public string? NewPassword { get; set; } = null!;
        public string? Token { get; set; } = null!;
    }
}
