using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using SU.Domain.Dtos;
using SU.Domain.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;

namespace SUAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly StackUnderflowContext _SU;
        private readonly IConfiguration _config;
        public UserController(StackUnderflowContext SU, IConfiguration configuration)
        {
            _SU = SU;
            _config = configuration;
        }
        public static LoginRequest user = new LoginRequest();
        [HttpPost]
        [Route("Login")]
        public ActionResult Login([FromBody] LoginRequest request)
        {
            var loginQuery = _SU.Users.Select(x => x.UserName == request.UserName || x.UserEmail == request.UserEmail && x.Password == request.Password).FirstOrDefault();

            var amogyQuery = _SU.Users.Where(x => x.UserName == request.UserName || x.UserEmail == request.UserEmail && x.Password == request.Password).FirstOrDefault();

            if (loginQuery)
            {
                string token = CreateToken(request);
                var refreshToken = GenerateRefreshToken();
                SetRefreshToken(refreshToken);
                return new JsonResult(token);
            }
            else
            {
                return NotFound();
            }
        }
        [HttpPost]
        [Route("Login2")]
        public ActionResult Login2([FromBody] LoginRequest request)
        {
            var loginQuery = _SU.Users.Select(x => x.UserName == request.UserName || x.UserEmail == request.UserEmail && x.Password == request.Password).FirstOrDefault();

            if (loginQuery)
            {
                string token = CreateToken(request);

                var refreshToken = GenerateRefreshToken();
                SetRefreshToken(refreshToken);
                return new JsonResult(token);
            }
            else
            {
                return NotFound();
            }
        }
        [HttpPost("refresh-token")]
        public ActionResult<string> RefreshToken(string utoken)
        {
            var refreshToken = Request.Cookies["refreshtoken"];

            if (!user.RefreshToken.Equals(refreshToken))
            {
                return Unauthorized("Invalid Refresh Token.");
            }
            else if (user.TokenExpires < DateTime.Now)
            {
                return Unauthorized("Token Expired");
            }
            string token = CreateToken(user);
            var newRefreshToken = GenerateRefreshToken();
            SetRefreshToken(newRefreshToken);
            return Ok(token);
        }
        private RefreshToken GenerateRefreshToken()
        {
            var refreshToken = new RefreshToken()
            {
                Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
                Expires = DateTime.Now.AddDays(7),
                Created = DateTime.Now
            };
            return refreshToken;
        }
        private void SetRefreshToken(RefreshToken newRefreshToken)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = newRefreshToken.Expires
            };
            Response.Cookies.Append("refreshToken", newRefreshToken.Token, cookieOptions);
            user.RefreshToken = newRefreshToken.Token;
            user.TokenCreated = newRefreshToken.Created;
            user.TokenExpires = newRefreshToken.Expires;
        }
        public string CreateToken(LoginRequest request)
        {
            List<Claim> claims = new List<Claim>();
            {
                new Claim(ClaimTypes.Name, request.UserEmail, request.Password);
            }
            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));
            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: cred
                );
            var jwttoken = new JwtSecurityTokenHandler().WriteToken(token);
            return jwttoken;
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
        [HttpGet]
        [Route("GoToUserProfile")]
        public ActionResult GoToUserProfile(string username)
        {
            var doesuserexist = _SU.Users.Any(x => x.UserName == username);
            if (doesuserexist)
            {
                var query = _SU.Users.Where(Users => Users.UserName == username).FirstOrDefault();
                UserDTO userDTO = new UserDTO()
                {
                    Id = query.Id,
                    UserName = query.UserName,
                    RegisterDate = query.RegisterDate
                };
                return new JsonResult(userDTO);
            }
            else
            {
                return NotFound();
            }
        }
    }
}
