using Microsoft.AspNetCore.Mvc;

namespace SUAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _config;
        public AuthController(IConfiguration configuration)
        {
            _config = configuration;
        }
        //public static LoginRequest LSR = new LoginRequest();
        //[HttpPost("CreateToken")]
        //public ActionResult CreateToken([FromBody] LoginRequest? LR)
        //{
        //    string token;
        //    if (LR != null)
        //    {
        //        LSR.UserEmail = LR.UserEmail;
        //        LSR.Password = LR.Password;
        //        LSR.UserName = LR.UserName;
        //        token = CreateToken(LR.UserName, LR.UserEmail, LR.Password);
        //        var jwtTokenParts = token.Split('.');
        //        var header = jwtTokenParts[0];
        //        var payload = jwtTokenParts[1];
        //        var decodedHeader = Base64UrlDecode(header);
        //        var decodedPayload = Base64UrlDecode(payload);

        //        return Ok(decodedPayload);
        //    }
        //    else
        //    {
        //        return BadRequest();
        //    }
        //}
        //public string CreateToken(string userName, string userEmail, string password)
        //{
        //    List<Claim> claims = new List<Claim>
        //    {
        //        new Claim("username", userName),
        //        new Claim("email", userEmail),
        //        new Claim("password", password)
        //    };

        //    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));
        //    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

        //    var token = new JwtSecurityToken(
        //        claims: claims,
        //        expires: DateTime.Now.AddDays(1),
        //        signingCredentials: creds
        //    );

        //    var jwt = new JwtSecurityTokenHandler().WriteToken(token);
        //    return jwt;
        //}
        //static string Base64UrlDecode(string input)
        //{
        //    input = input.Replace('-', '+').Replace('_', '/');
        //    while (input.Length % 4 != 0)
        //    {
        //        input += '=';
        //    }
        //    var base64 = Convert.FromBase64String(input);
        //    return Encoding.UTF8.GetString(base64);
        //}
        //private void SetRefreshToken(RefreshToken newRefreshToken)
        //{
        //    var cookieOptions = new CookieOptions
        //    {
        //        HttpOnly = true,
        //        Expires = newRefreshToken.Expires
        //    };
        //    Response.Cookies.Append("refreshToken", newRefreshToken.Token, cookieOptions);
        //    LSR.RefreshToken = newRefreshToken.Token;
        //    LSR.TokenCreated = newRefreshToken.Created;
        //    LSR.TokenExpires = newRefreshToken.Expires;
        //}
    }
}
