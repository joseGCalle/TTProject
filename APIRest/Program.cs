using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace APIRest
{
    class Program
    {
        private static readonly HttpClient client = new HttpClient();
        private static JsonSerializer jsonSerializer = new JsonSerializer();
        private static string newskey = "07251493e8a147bba083fa751f086c66";
        private static string weatherKey = "2aa2d82e2ed1b2b86bff82b5dc0ed66f";

        static async Task Main(string[] args)
        {
            await GetNewsAndWeather("us");
        }
        private static async Task GetNewsAndWeather(string cityname)
        {
            NewsAndWeatherFromCity newsAndWeatherFromCity = new NewsAndWeatherFromCity();
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));

            HttpResponseMessage response = await client.GetAsync("https://newsapi.org/v2/everything?q={cityname}&apiKey={newskey}");
            response.EnsureSuccessStatusCode();
            string responseBody = await response.Content.ReadAsStringAsync();
            newsAndWeatherFromCity.news = JsonConvert.DeserializeObject<News>(responseBody);

            response = await client.GetAsync("api.openweathermap.org/data/2.5/weather?q={cityname}&APPID={weatherKey}");
            response.EnsureSuccessStatusCode();
            responseBody = await response.Content.ReadAsStringAsync();

            newsAndWeatherFromCity.weatherInfo = JsonConvert.DeserializeObject<WeatherInfo>(responseBody);

            Console.Write(streamTask.Result.ToString());
            Console.ReadKey();
        }
    }
}
