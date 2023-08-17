using Microsoft.AspNetCore.Mvc;
using SUClient.Models;
using System.Diagnostics;

namespace SUClient.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
        public IActionResult GoToUserProfile()
        {
            return View("GoToUserProfile");
        }
        public IActionResult Questions()
        {
            return View("Questions");
        }
        public IActionResult Ask()
        {
            return View("Ask");
        }
        //[HttpPost]
        //[AllowAnonymous]
        //public async Task<IActionResult> Login([FromBody] LoginRequest LR)
        //{
        //    if (LR != null)
        //    {
        //        var responseContent = await HttpHelper.httpClient.PostAsync("/api/Auth/AuthUser", new StringContent(System.Text.Json.JsonSerializer.Serialize(LR), Encoding.UTF8, "application/json")).Result.Content.ReadAsStringAsync();
        //        return View("Ask");
        //    }
        //    else
        //    {
        //        return BadRequest();
        //    }
        //}
    }
}