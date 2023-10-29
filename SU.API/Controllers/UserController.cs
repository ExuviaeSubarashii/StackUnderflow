using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using SU.Domain.Dtos;
using SU.Domain.Models;
using SU.Service;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Threading;

namespace SUAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly StackUnderflowContext _SU;
        private readonly IConfiguration _config;
        private CancellationTokenSource _cancellationTokenSource = new CancellationTokenSource();
        private CancellationToken _cancellationToken => _cancellationTokenSource.Token;
        public UserController(StackUnderflowContext SU, IConfiguration configuration)
        {
            _SU = SU;
            _config = configuration;
        }
        [HttpPost("Login")]
        public async Task<ActionResult> Login([FromBody] LoginRequest request)
        {
            try
            {
                _cancellationToken.ThrowIfCancellationRequested();


                var loginQuery = _SU.Users.Any(x => x.UserName == request.UserName || x.UserEmail == request.UserEmail && x.Password == request.Password);

                var userAuthQuery = _SU.Users.Where(x => x.UserName == request.UserName || x.UserEmail == request.UserEmail && x.Password == request.Password).FirstOrDefault();

                if (loginQuery)
                {
                    UserAuthDto userAuthDto = new UserAuthDto()
                    {
                        EncEmail = request.UserEmail,
                        Token = userAuthQuery.UserToken,
                        UserName = userAuthQuery.UserName,
                    };
                    return new JsonResult(userAuthDto);
                }
                else
                {
                    return NotFound();
                }
            }
            catch (OperationCanceledException)
            {

                return StatusCode(StatusCodes.Status503ServiceUnavailable, "Operation was canceled.");

            }
        }
        [HttpPost("AuthUser")]
        public async Task<ActionResult> AuthUser([FromBody] LoginRequest request)
        {
            try
            {
                _cancellationToken.ThrowIfCancellationRequested();


                var query = _SU.Users.Any(x => x.UserToken == request.Token);
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
            catch (OperationCanceledException)
            {

                return StatusCode(StatusCodes.Status503ServiceUnavailable, "Operation was canceled.");

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
        [HttpPost("Register")]
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
        [HttpGet("GoToUserProfile")]
        public async Task<ActionResult> GoToUserProfile(string username, Users? query)
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
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }
        [HttpGet("GetUserComments")]
        public async Task<ActionResult> GetUserComments(string? username)
        {
            try
            {
                _cancellationToken.ThrowIfCancellationRequested();


                var commentQuery = _SU.Comments.Where(x => x.CommenterName == username).ToList();
                int[] postIdArray = new int[commentQuery.Count];
                int[] commentIdArray = new int[commentQuery.Count];
                int postindex = 0;
                int commentindex = 0;

                foreach (var comment in commentQuery)
                {
                    postIdArray[postindex] = comment.PostId;
                    commentIdArray[commentindex] = comment.CommentId;
                    postindex++;
                    commentindex++;
                }
                List<UserProfileCommentsDTO> userCommentList = new List<UserProfileCommentsDTO>();
                for (int i = 0; i < commentQuery.Count; i++)
                {
                    var postQuery = _SU.UserPosts.FirstOrDefault(x => x.Id == postIdArray[i]);
                    var userCommentQuery = _SU.Comments.FirstOrDefault(x => x.CommentId == commentIdArray[i]);

                    UserProfileCommentsDTO UPC = new UserProfileCommentsDTO()
                    {
                        PostId = postIdArray[i],
                        CommentId = commentIdArray[i],
                        CommenterName = userCommentQuery.CommenterName.Trim(),
                        CommentDate = userCommentQuery.CommentDate,
                        CommentContent = userCommentQuery.CommentContent.Trim(),
                        Header = postQuery.Header.Trim(),
                        MainContent = postQuery.MainContent.Trim(),
                        Image = postQuery.Image,
                        PostDate = postQuery.PostDate,
                        PosterName = postQuery.PosterName.Trim(),
                        Tags = postQuery.Tags.Trim(),
                    };
                    userCommentList.Add(UPC);
                }

                if (userCommentList.Count > 0)
                {
                    return new JsonResult(userCommentList.ToList());
                }
                else
                {
                    return new JsonResult(Enumerable.Empty<UserProfileCommentsDTO>());
                }
            }
            catch (OperationCanceledException)
            {

                return StatusCode(StatusCodes.Status503ServiceUnavailable, "Operation was canceled.");

            }
        }
    }
}
