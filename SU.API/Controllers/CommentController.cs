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
        private CancellationTokenSource _cancellationTokenSource = new CancellationTokenSource();
        private CancellationToken _cancellationToken => _cancellationTokenSource.Token;
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
        public async Task<ActionResult> GetComments(string userName)
        {
            try
            {
                _cancellationToken.ThrowIfCancellationRequested();

                var getCommentQuery = _SU.Comments.Where(x => x.CommenterName == userName).ToList();
                if (getCommentQuery != null)
                {
                    return Ok(getCommentQuery);
                }
                else
                {
                    return Ok(new List<Comment>());
                }
            }
            catch (OperationCanceledException)
            {

                return StatusCode(StatusCodes.Status503ServiceUnavailable, "Operation was canceled.");
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
        [HttpPost("DeleteOwnedComment")]
        public async Task<ActionResult> DeleteOwnedComment(string userToken, int commentId)
        {
            var AreYouTheUser = _SU.Users.FirstOrDefault(x => x.UserToken == userToken);
            var DoYouOwnTheComment = _SU.Comments.Where(x => x.CommentId == commentId).FirstOrDefault();
            if (AreYouTheUser.UserEmail == DoYouOwnTheComment.CommenterName)
            {
                _SU.Comments.Remove(DoYouOwnTheComment);
                _SU.SaveChanges();
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }


    }
}









