namespace SU.Domain.Models
{
    public partial class Tag
    {
        public int Id { get; set; }
        public string TagName { get; set; } = null!;
        public int TagAmount { get; set; }
    }
}
