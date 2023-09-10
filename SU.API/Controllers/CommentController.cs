using Microsoft.AspNetCore.Mvc;
using SU.Domain.Dtos;
using SU.Domain.Models;

namespace SUAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly StackUnderflowContext _SU;
        public CommentController(StackUnderflowContext SU)
        {
            _SU = SU;
        }
        [HttpPost]
        [Route("AddComment")]
        public ActionResult AddComment([FromBody] NewCommentRequest commentreq)
        {
            if (!string.IsNullOrWhiteSpace(commentreq.PostId.ToString()) && !string.IsNullOrWhiteSpace(commentreq.CommentContent))
            {
                var checkifpostexists = _SU.UserPosts.Where(x => x.Id == commentreq.PostId).Any();
                var checkifuserexists = _SU.Users.Any(x => x.UserToken == commentreq.UserToken);
                var userContext = _SU.Users.FirstOrDefault(x => x.UserToken == commentreq.UserToken);
                if (checkifpostexists && checkifuserexists)
                {
                    Comment newComment = new Comment()
                    {
                        CommenterName = userContext.UserName,
                        CommentContent = commentreq.CommentContent,
                        CommentDate = DateTime.Now,
                        PostId = commentreq.PostId
                    };
                    _SU.Comments.Add(newComment);
                    _SU.SaveChanges();
                }
                return Ok();
            }
            else
            {
                return NotFound();
            }
        }
        [HttpPost]
        [Route("EditComment")]
        public ActionResult EditComment([FromBody] NewCommentRequest commentreq)
        {
            var checkifcommentexists = _SU.Comments.FirstOrDefault(x => x.CommentId == commentreq.PostId);
            if (checkifcommentexists != null)
            {
                checkifcommentexists.CommentContent = commentreq.CommentContent;
                //try to add if the comment is sent or edited
                checkifcommentexists.CommentDate = DateTime.Now;
                _SU.SaveChanges();
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }
        [HttpGet]
        [Route("GetAllMyCommentedPosts")]
        public List<Comment> GetComments(string userName)
        {
            try
            {
                return _SU.Comments.Where(x => x.CommenterName == userName).ToList();
            }
            catch (Exception)
            {
                return new List<Comment>();
            }
        }
        [HttpGet("PostSpecificComments")]
        public List<Comment> PostSpecificComments(int postId)
        {
            try
            {
                return _SU.Comments.Where(x => x.PostId == postId).ToList();
            }
            catch (Exception)
            {
                return new List<Comment>();
            }
        }


    }
}









