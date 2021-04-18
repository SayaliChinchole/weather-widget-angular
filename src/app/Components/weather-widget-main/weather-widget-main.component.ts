import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather-widget-main',
  templateUrl: './weather-widget-main.component.html',
  styleUrls: ['./weather-widget-main.component.css']
})
export class WeatherWidgetMainComponent implements OnInit {

  weatherData:any;

  constructor() { }

  ngOnInit(): void {
    this.weatherData = {
      main :{},
      isDay : true
    }
    this.getWeatherData();
    console.log(this.weatherData)
  }

  getWeatherData(){
  //http://api.openweathermap.org/data/2.5/weather?id=524901&appid=f64cae2bd0a8157913ce9c7b1cc9532e&lang=en
  //api.openweathermap.org/data/2.5/weather?q=London,uk&callback=test&appid={API key}
    fetch('http://api.openweathermap.org/data/2.5/weather?q=mumbai&lang=en&appid=f64cae2bd0a8157913ce9c7b1cc9532e')
    .then(response=>response.json())
    .then(data=>{this.setWeatherData(data);})

    // let data = JSON.parse(`{
    //   "coord": {
    //     "lon": -122.08,
    //     "lat": 37.39
    //   },
    //   "weather": [
    //     {
    //       "id": 800,
    //       "main": "Clear",
    //       "description": "clear sky",
    //       "icon": "01d"
    //     }
    //   ],
    //   "base": "stations",
    //   "main": {
    //     "temp": 282.55,
    //     "feels_like": 281.86,
    //     "temp_min": 280.37,
    //     "temp_max": 284.26,
    //     "pressure": 1023,
    //     "humidity": 100
    //   },
    //   "visibility": 16093,
    //   "wind": {
    //     "speed": 1.5,
    //     "deg": 350
    //   },
    //   "clouds": {
    //     "all": 1
    //   },
    //   "dt": 1560350645,
    //   "sys": {
    //     "type": 1,
    //     "id": 5122,
    //     "message": 0.0139,
    //     "country": "US",
    //     "sunrise": 1560343627,
    //     "sunset": 1560396563
    //   },
    //   "timezone": -25200,
    //   "id": 420006353,
    //   "name": "Mountain View",
    //   "cod": 200
    //   }                    `     
    // );
    // this.setWeatherData(data);
  }

  setWeatherData(data){
    this.weatherData = data;
    console.log({data});
    let sunsetTime = new Date(this.weatherData.sys.sunset * 1000);
    this.weatherData.sunset_time = sunsetTime.toLocaleTimeString();
    let currentDate = new Date();
    //decide id day or not
    //if current time < sunset time then its day time
    this.weatherData.isDay = (currentDate.getTime() < sunsetTime.getTime());
    //converting to celcius from kelvindefault(), decimal 0 - toFixed(0)
    this.weatherData.temp_celcius = (this.weatherData.main.temp - 273.15).toFixed(0);
    this.weatherData.temp_min = (this.weatherData.main.temp_min - 273.15).toFixed(0);
    this.weatherData.temp_max = (this.weatherData.main.temp_max - 273.15).toFixed(0);
    this.weatherData.temp_feels_like = (this.weatherData.main.feels_like - 273.15).toFixed(0);
    //weather
    this.weatherData.condition = this.weatherData.weather[0].main;
    this.weatherData.is_cloudy =  (this.weatherData.condition == 'Clouds');
    console.log(this.weatherData.condition);
    console.log(this.weatherData.is_cloudy);
    console.log(this.weatherData);
  }

}
