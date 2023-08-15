using Microsoft.AspNetCore.Mvc;
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
    }
}
