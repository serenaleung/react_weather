import React, { Component } from 'react';
import './App.css';

let api = 'ca09ef66f20aaca6f3417ddb5686f5e7';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      city: undefined
    }
    this.getWeather = this.getWeather.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  getWeather(city) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`)
      .then(function(response) {
        return response.json()
      }).then(function(json) {
        console.log('parsed json', json)
      }).catch(function(ex) {
        console.log('parsing failed', ex)
      })
  }

  onFormSubmit(event) {
    event.preventDefault();
    let city = this.refs.city.value
    this.setState({city: city});
    this.getWeather(city);
    console.log("THIS.STATE", this.state)
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
            onChange={this.onFormSubmit}
          />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default App;
