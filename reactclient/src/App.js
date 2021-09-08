import './App.css';
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.baseUrl = "https://localhost:44363/WeatherAndNews?cityname=";
    this.city = {value: ''};
    this.state={
      news: '',
      weatherInfo: ''
    };
    this.handleChange = this.handleChange.bind(this);

    this.getNewsAndWeather= async function(city) {
      console.log(city);
      try {
        await fetch(this.baseUrl+this.city.value)
          .then(function (response) {
            console.log(response.news);
            return response.json();
          })
          .then(function (myjson) {
            console.log(myjson.news.status);
            this.state.news(myjson.news.status)
          });
      } catch (error) {
        console.error(error);
      }
    };
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  // useEffect(() => {

  //   getNewsAndWeather();
  // }, [])
  
render(){
  return (
    <div className="App">
      {
        <div className="container">
          <div className="row">
            <form className="col s12">
              <div className="row">
                <div className="input-field col s6">
                  <input id="search" type="text" className="validate" name="city" defaultValue={this.city.value} onChange={this.handleChange}></input>
                  <label htmlFor="search">Ingrese una ciudad</label>
                </div>
                <button className="waves-effect waves-light btn" onClick={() => this.getNewsAndWeather()}>Buscar</button>
              </div>
            </form>
            <div className="row" id="responsecontent">
            <div className="row">
              <div className="col s12 m6">
                <div className="card blue-grey darken-1">
                  <div className="card-content white-text">
                    <span className="card-title">{this.state.news}</span>
                    <p>I am a very simple card. I am good at containing small bits of information.
                    I am convenient because I require little markup to use effectively.</p>
                  </div>
                  <div className="card-action">
                    <a href="#">This is a link</a>
                    <a href="#">This is a link</a>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      }
    </div>
  )}
}

export default App;
