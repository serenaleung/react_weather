import React, { Component } from 'react';
import './App.css';

let api = 'ca09ef66f20aaca6f3417ddb5686f5e7';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      city: undefined,
      temperature: undefined
      // showTemp: false
    }
    this.getWeather = this.getWeather.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onCityInput = this.onCityInput.bind(this);
  }

  getWeather(city) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`)
      .then(response => response.json())
      .then(json => {
        console.log('parsed json', json)
        console.log("THIS.STATE", this.state)
        // debugger
        this.setState({
          temperature: this.convertTemp(json.main.temp)
        })
      }).catch(function(ex) {
        console.log('parsing failed', ex)
      })
  }

  convertTemp(temp) {
    return parseFloat(temp - 273.15).toFixed(2)
  }

  onCityInput() {
    let city = this.refs.city.value
    this.setState({ city: city })
    console.log("THIS.STATE", this.state)
  }

  onFormSubmit(event) {
    event.preventDefault();
    let city = this.refs.city.value
    this.getWeather(city);
  }

  renderWeather() {
    // if(this.state.showTemp){
      return <div>The temperature in {this.state.city} is {this.state.temperature}°C</div>
    // }
  }

  render() {
    return (
      <div className="App">
        <h1>Get Weather</h1>
        <form onSubmit={this.onFormSubmit}>
          <input
            className="form"
            type="text"
            name="city"
            ref="city"
            placeholder="Search by the city"
            value={this.state.city}
            onChange={this.onCityInput}
          />
          <button>Submit</button>
        </form>
        {
          this.renderWeather()
        }
      </div>
    );
  }
}

export default App;
