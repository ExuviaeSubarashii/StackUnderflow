namespace SU.Domain.Dtos
{
    public class NewCommentRequest
    {
        public int PostId { get; set; }
        public string UserToken { get; set; } = null;
        public DateTime CommentDate { get; set; }
        public string CommentContent { get; set; } = null;
    }
}
