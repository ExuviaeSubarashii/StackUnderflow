using Microsoft.AspNetCore.Mvc;
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
        public JsonResult GetAllPosts() { return new JsonResult(_SU.UserPosts.ToList()); }
        [HttpGet]
        [Route("GetAllMyPosts")]
        public JsonResult GetAllMyPosts(string userName)
        {
            return new JsonResult(_SU.UserPosts.Where(x => x.PosterName == userName).ToList());
        }
        [HttpPost]
        [Route("NewPost")]
        public ActionResult AddNewPost(NewPostRequest request)
        {
            UserPost newPost = new UserPost()
            {
                Header = request.Header,
                Image = request.Image,
                MainContent = request.MainContent,
                PostDate = DateTime.Now,
                PosterName = request.PosterName,
            };
            _SU.UserPosts.Add(newPost);
            _SU.SaveChanges();
            return Ok();
        }
    }
}
