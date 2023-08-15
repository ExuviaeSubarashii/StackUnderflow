using Microsoft.AspNetCore.Mvc;
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
    }
}
