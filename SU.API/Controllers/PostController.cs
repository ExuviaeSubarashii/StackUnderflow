using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SU.Domain.Dtos;
using SU.Domain.Models;

namespace SUAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly StackUnderflowContext _SU;
        public PostController(StackUnderflowContext SU)
        {
            _SU = SU;
        }
        [HttpGet]
        [Route("GetAllPosts")]
        public async Task<ActionResult> GetAllPosts()
        {
            var gap = await _SU.UserPosts.ToListAsync();
            return new JsonResult(gap);
        }
        [HttpGet]
        [Route("GetAllMyPosts")]
        public async Task<ActionResult> GetAllMyPosts(string userName, CancellationToken cancellationToken)
        {
            if (cancellationToken.IsCancellationRequested)
            {
                return StatusCode(499, "Request was cancelled by the server.");
            }
            var userPosts = await _SU.UserPosts.Where(x => x.PosterName == userName).ToListAsync();
            return new JsonResult(userPosts);
        }
        [HttpGet("Questions")]
        public async Task<ActionResult> Questions(int postId, CancellationToken cancellationToken)
        {
            var post = await _SU.UserPosts.FirstOrDefaultAsync(x => x.Id == postId, cancellationToken);

            if (post != null)
            {
                return new JsonResult(post);
            }
            else
            {
                return NotFound(); // Return a 404 response if the post is not found
            }
        }
        [HttpPost]
        [Route("NewPost")]
        public ActionResult AddNewPost(NewPostRequest request, CancellationToken cancellationToken)
        {
            if (cancellationToken.IsCancellationRequested)
            {
                return StatusCode(499, "Request was cancelled by the server.");
            }
            if (request != null)
            {
                UserPost newPost = new UserPost()
                {
                    Header = request.Header,
                    Image = request.Image,
                    MainContent = request.MainContent,
                    PostDate = DateTime.Now,
                    PosterName = request.PosterName,
                    Tags = request.Tags,
                };
                _SU.UserPosts.Add(newPost);
                _SU.SaveChanges();
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }
        //gonderi silindiginde o post idsindeki yorumlari da sil
        [HttpPost]
        [Route("DeletePost")]
        public async Task<ActionResult> DeletePost([FromBody] DeletePostRequest DPR)
        {
            var doesPostExist = _SU.UserPosts.Any(x => x.Id == DPR.PostId);
            var postContent = _SU.UserPosts.FirstOrDefault(x => x.Id == DPR.PostId);
            var postContentComments = _SU.Comments.Where(x => x.PostId == DPR.PostId).ToList();
            var getUser = _SU.Users.FirstOrDefault(x => x.UserToken == DPR.PosterToken);
            if (doesPostExist && getUser.UserEmail.Trim() == postContent.PosterName.Trim())
            {
                _SU.UserPosts.Remove(postContent);
                _SU.Comments.RemoveRange(postContentComments);
                _SU.SaveChanges();
                return Ok();
            }
            else
            {
                return Unauthorized();
            }
        }
    }
}
