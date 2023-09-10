namespace SU.Domain.Dtos
{
    public class UserProfileCommentsDTO
    {
        public int CommentId { get; set; }
        public int PostId { get; set; }
        public string CommenterName { get; set; } = null;
        public DateTime CommentDate { get; set; }
        public string CommentContent { get; set; } = null;
        public string Header { get; set; } = null!;
        public string MainContent { get; set; } = null!;
        public byte[]? Image { get; set; }
        public DateTime PostDate { get; set; }
        public string PosterName { get; set; } = null!;
        public string Tags { get; set; } = null!;
    }
}
