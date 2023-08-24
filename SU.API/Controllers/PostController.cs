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
        public async Task<ActionResult> GetAllMyPosts(string userName)
        {
            var userPosts = await _SU.UserPosts.Where(x => x.PosterName == userName).ToListAsync();
            return new JsonResult(userPosts);
        }
        [HttpGet("questions")]
        public async Task<ActionResult> Questions(int postId)
        {
            var post = await _SU.UserPosts.FirstOrDefaultAsync(x => x.Id == postId);

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
        public ActionResult AddNewPost(NewPostRequest request)
        {
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
    }
}
