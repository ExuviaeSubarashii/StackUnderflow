namespace SU.Domain.Dtos
{
    public class NewPostRequest
    {
        public int Id { get; set; }
        public string Header { get; set; } = null!;
        public string MainContent { get; set; } = null!;
        public byte[]? Image { get; set; }
        public DateTime PostDate { get; set; }
        public string PosterName { get; set; } = null!;
        public string Tags { get; set; } = null!;
    }
}
