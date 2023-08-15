using Microsoft.AspNetCore.Mvc;
using SU.Domain.Models;

namespace SUAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly StackUnderflowContext _SU;
        public UserController(StackUnderflowContext SU)
        {
            _SU = SU;
        }
    }
}
