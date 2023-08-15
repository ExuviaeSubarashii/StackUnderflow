using Microsoft.AspNetCore.Mvc;
using SU.Domain.Dtos;
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
        [HttpPost]
        [Route("Login")]
        public ActionResult Login([FromBody] LoginRequest request)
        {
            var loginQuery = _SU.Users.Select(x => x.UserName == request.UserName || x.UserEmail == request.UserEmail && x.Password == request.Password).FirstOrDefault();

            if (loginQuery)
            {
                return Ok();
            }
            else
            {
                return NotFound();
            }
        }
        [HttpPost]
        [Route("Register")]
        public ActionResult Register([FromBody] RegisterRequest request)
        {
            var registerQuery = _SU.Users.Where(x => x.UserName == request.UserName && x.UserEmail == request.UserEmail).Any();

            if (registerQuery) { return BadRequest(); }
            else
            {
                Users newUser = new Users()
                {
                    UserName = request.UserName,
                    UserEmail = request.UserEmail,
                    Password = request.Password,
                    RegisterDate = DateTime.Today
                };
                _SU.Users.Add(newUser);
                _SU.SaveChanges();
                return Ok();
            }
        }
    }
}
