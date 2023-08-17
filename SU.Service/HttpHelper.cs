namespace SU.Service
{
    public class HttpHelper
    {
        public static HttpClient httpClient = new HttpClient()
        {
            BaseAddress = new Uri("https://localhost:5226")
        };
    }
}
