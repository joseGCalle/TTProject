using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.Net.Http.Headers;

namespace NewsAndWeatherAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherAndNewsController : ControllerBase
    {
        private static readonly HttpClient client = new HttpClient();
        private static string newskey = "07251493e8a147bba083fa751f086c66";
        private static string weatherKey = "2aa2d82e2ed1b2b86bff82b5dc0ed66f";


        [HttpGet]
        public async Task<NewsAndWeatherFromCity> Get(string cityname)
        {
            NewsAndWeatherFromCity newsAndWeatherFromCity = new NewsAndWeatherFromCity();
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));

            HttpResponseMessage response = await client.GetAsync(String.Format("https://newsapi.org/v2/everything?q={0}&apiKey={1}", cityname,newskey));
            response.EnsureSuccessStatusCode();
            string responseBody = await response.Content.ReadAsStringAsync();
            newsAndWeatherFromCity.news = JsonConvert.DeserializeObject<News>(responseBody);

            response = await client.GetAsync(String.Format("https://api.openweathermap.org/data/2.5/weather?q={0}&APPID={1}", cityname, weatherKey));
            response.EnsureSuccessStatusCode();
            responseBody = await response.Content.ReadAsStringAsync();

            newsAndWeatherFromCity.weatherInfo = JsonConvert.DeserializeObject<WeatherInfo>(responseBody);
            return newsAndWeatherFromCity;
        }
    }
}
