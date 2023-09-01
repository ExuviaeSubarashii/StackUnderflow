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
        public UserController(StackUnderflowContext SU, IConfiguration configuration)
        {
            _SU = SU;
            _config = configuration;
        }
        [HttpPost]
        [Route("Login")]
        public async Task<ActionResult> Login([FromBody] LoginRequest request)
        {
            var loginQuery = _SU.Users.Any(x => x.UserName == request.UserName || x.UserEmail == request.UserEmail && x.Password == request.Password);

            var amogyQuery = _SU.Users.Where(x => x.UserName == request.UserName || x.UserEmail == request.UserEmail && x.Password == request.Password).FirstOrDefault();

            if (loginQuery)
            {
                string token = CreateToken(request);
                const string passphrase = "Sup3rS3curePass!";
                var encryptionService = new EncryptionService();

                var encpass = await encryptionService.EncryptAsync(request.Password, passphrase);

                var fullpass = BitConverter.ToString(encpass);

                var decrypted = await encryptionService.DecryptAsync(encpass, passphrase);

                UserAuthDto userAuthDto = new UserAuthDto()
                {
                    EncEmail = request.UserEmail,
                    EncPassword = fullpass,
                    Token = token,
                    UserName = amogyQuery.UserName,
                };
                var json = new JsonResult(userAuthDto);
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
            //token expiration check
            var jwtToken = new JwtSecurityTokenHandler().ReadToken(request.Token) as JwtSecurityToken;
            if (request.Token != null && jwtToken.ValidTo > DateTime.UtcNow)
            {
                return Ok();
            }
            else if (request.UserEmail != null && request.Password != null)
            {
                return new JsonResult(CreateToken(request));
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
    }
}
