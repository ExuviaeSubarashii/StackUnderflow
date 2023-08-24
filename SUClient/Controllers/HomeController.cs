using Microsoft.AspNetCore.Mvc;
using SUClient.Models;
using System.Diagnostics;

namespace SUClient.Controllers
{
    public class HomeController : Controller
    {
        public HomeController()
        {
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
        public IActionResult LoginPage()
        {
            return View("Login");
        }
    }
}