namespace SU.Domain.Dtos
{
    public class RegisterRequest
    {
        public int Id { get; set; }
        public string UserEmail { get; set; } = null!;
        public string UserName { get; set; } = null!;
        public string Password { get; set; } = null!;
    }
}
