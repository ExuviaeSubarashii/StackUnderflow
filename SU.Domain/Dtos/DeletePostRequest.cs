namespace SU.Domain.Dtos
{
    public class DeletePostRequest
    {
        public int PostId { get; set; }
        public string? PosterToken { get; set; }
    }
}
