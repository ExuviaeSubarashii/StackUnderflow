using System;
using System.Collections.Generic;

namespace SU.Domain.Models
{
    public partial class Comment
    {
        public int CommentId { get; set; }
        public int PostId { get; set; }
        public string? CommenterName { get; set; }
        public DateTime? CommentDate { get; set; }
        public string? CommentContent { get; set; }
    }
}
