namespace SU.Domain.Models
{
    public partial class Users
    {
        public int Id { get; set; }
        public string UserEmail { get; set; } = null!;
        public string UserName { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string HashPassword { get; set; } = null!;
        public DateTime RegisterDate { get; set; }
        public string UserToken { get; set; } = null!;
    }
}
