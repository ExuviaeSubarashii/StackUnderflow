using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using SU.Domain.Dtos;
using SU.Domain.Models;
using SU.Service;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace SUAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly StackUnderflowContext _SU;
        private readonly IConfiguration _config;
        private readonly EncryptionService _encryptionService;
        const string passphrase = "Sup3rS3curePass!";
        public UserController(StackUnderflowContext SU, IConfiguration configuration, EncryptionService encryptionService)
        {
            _SU = SU;
            _config = configuration;
            _encryptionService = encryptionService;
        }
        [HttpPost]
        [Route("Login")]
        public async Task<ActionResult> Login([FromBody] LoginRequest request)
        {
            var loginQuery = _SU.Users.Any(x => x.UserName == request.UserName || x.UserEmail == request.UserEmail && x.Password == request.Password);

            var amogyQuery = _SU.Users.Where(x => x.UserName == request.UserName || x.UserEmail == request.UserEmail && x.Password == request.Password).FirstOrDefault();

            if (loginQuery)
            {
                UserAuthDto userAuthDto = new UserAuthDto()
                {
                    EncEmail = request.UserEmail,
                    Token = amogyQuery.UserToken,
                    UserName = amogyQuery.UserName,
                };
                return new JsonResult(userAuthDto);
            }
            else
            {
                return NotFound();
            }
        }
        [HttpPost("AuthUser")]
        public async Task<ActionResult> AuthUser([FromBody] LoginRequest request)
        {
            var query = _SU.Users.Select(x => x.UserToken == request.Token).FirstOrDefault();
            if (query)
            {
                UserAuthDto userAuthDto = new UserAuthDto()
                {
                    Token = request.Token
                };
                return new JsonResult(userAuthDto);
            }
            else
            {
                return BadRequest();
            }
        }
        public string CreateToken(LoginRequest request)
        {
            List<Claim> claims = new List<Claim>();
            {
                _ = new Claim(ClaimTypes.Name, request.UserEmail, request.Password);
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
        public string CreateRegisterToken(string userName, string userEmail, string password)
        {
            List<Claim> claims = new List<Claim>();
            {
                _ = new Claim(ClaimTypes.Name, userName, userEmail, password);
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
            var usernameQuery = _SU.Users.Where(x => x.UserName == request.UserName).Any();
            var emailQuery = _SU.Users.Any(x => x.UserEmail == request.UserEmail);

            if (usernameQuery && emailQuery) { return BadRequest(); }
            else
            {
                Users newUser = new Users()
                {
                    UserName = request.UserName,
                    UserEmail = request.UserEmail,
                    Password = request.Password,
                    RegisterDate = DateTime.Today,
                    HashPassword = request.Password.ConvertStringToMD5(),
                    UserToken = CreateRegisterToken(request.UserName, request.UserEmail, request.Password)
                };
                _SU.Users.Add(newUser);
                _SU.SaveChanges();
                return Ok();
            }
        }
        [HttpGet]
        [Route("GoToUserProfile")]
        public ActionResult GoToUserProfile(string username, Users? query)
        {
            var doesuserexist = _SU.Users.Any(x => x.UserName == username);
            if (doesuserexist)
            {
                query = _SU.Users.Where(Users => Users.UserName == username).FirstOrDefault();
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
        [HttpPost("ChangePassword")]
        public ActionResult ChangePassword([FromBody] ChangePasswordDTO request)
        {
            var usernameQuery = _SU.Users.Where(x => x.UserToken == request.Token).Any();
            var getUser = _SU.Users.FirstOrDefault(x => x.UserToken == request.Token);
            if (usernameQuery && getUser.Password != request.NewPassword)
            {
                getUser.Password = request.NewPassword.Trim();
                getUser.UserToken = CreateRegisterToken(getUser.UserName, getUser.UserEmail, request.NewPassword);
                _SU.SaveChanges();
                ChangePasswordDTO changePasswordDTO = new ChangePasswordDTO()
                {
                    Token = getUser.UserToken
                };
                return new JsonResult(changePasswordDTO);
            }
            else
            {
                return BadRequest();
            }

        }
    }
}
