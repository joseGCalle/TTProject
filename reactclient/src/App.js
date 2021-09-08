import './App.css';
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.baseUrl = "https://localhost:44363/WeatherAndNews?cityname=";
    this.state = {value: ''};
    this.weather = {value:''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }
    
  handleSubmit(event) {
    event.preventDefault();
    try {
      fetch(this.baseUrl+this.state.value)
      .then(function (response) {
        console.log(response.WeatherInfo);
        return response.json();
      })
      .then(function (myjson) {
        console.log()
        this.setWeather({value: myjson.WeatherInfo.name})
      });
    } catch (error) {
      console.error(error);
    }
  }

  
render(){
  return (
    <div className="App">
      {
        <div className="container">
          <div className="row">
            <form className="col s12" onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="input-field col s6">
                  <input id="search" type="text" defaultValue={this.state.value} onChange={this.handleChange}></input>
                  <label htmlFor="search">Ingrese una ciudad</label>
                </div>
                <input type="submit" value="Submit" />
              </div>
            </form>
            <div className="row" id="responsecontent">
            <div className="row">
              <div className="col s12 m6">
                <div className="card blue-grey darken-1">
                  <div className="card-content white-text">
                    <span className="card-title">{this.weather.value}</span>
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
