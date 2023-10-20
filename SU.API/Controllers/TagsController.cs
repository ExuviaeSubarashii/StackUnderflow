using Microsoft.AspNetCore.Mvc;
using SU.Domain.Models;

namespace SUAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagsController : ControllerBase
    {
        private readonly StackUnderflowContext _SU;
        public TagsController(StackUnderflowContext SU)
        {
            _SU = SU;
        }
        [HttpGet("AddTags")]
        public async Task<ActionResult> AddTags()
        {
            var tagList = _SU.UserPosts.Select(x => x.Tags).ToList();

            var duplicateGroups = tagList
                .GroupBy(tag => tag)
                .Where(group => group.Count() >= 1);

            foreach (var group in duplicateGroups)
            {
                if (tagList.Contains(group.Key))
                {
                    return Ok(tagList);
                }
                else
                {
                    int tagCount = group.Count();
                    Tag tag1 = new Tag()
                    {
                        TagName = group.Key,
                        TagAmount = tagCount
                    };
                    _SU.Tags.Add(tag1);
                    _SU.SaveChanges();
                }
            }
            return Ok(duplicateGroups);
        }
        [HttpGet("GetTags")]
        public async Task<ActionResult> GetTags()
        {
            List<Tag> tags = _SU.Tags.ToList();
            if (tags != null)
            {
                return Ok(tags);
            }
            else
            {
                return Ok(new List<Tag>());
            }
        }
        [HttpGet("GetTagged")]
        public async Task<ActionResult> GetTagged(string tagName)
        {
            var tagList = _SU.UserPosts.Where(x => x.Tags == tagName.Trim()).ToList();
            if (tagList != null)
            {
                return new JsonResult(tagList);
            }
            else
            {
                return new JsonResult(new List<Tag>());
            }

        }
    }
}
