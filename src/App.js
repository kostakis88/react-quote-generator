import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      data: []
    }
  }

  fetchData = () => {
    fetch('https://talaikis.com/api/quotes/random/')
      .then(results => results.json())
      .then(results => this.setState({data: results}));
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <div id="quote-box">
        <header className="App-header">
          <h1>
            Random Quote Generator
          </h1>
          <p>{this.state.data.cat}</p>
          <p id="text">{this.state.data.quote}</p>
          <p id="author">{this.state.data.author}</p>
          <button id="new-quote" onClick={this.fetchData}>New Quote</button>
          <a id="tweet-quote" href="https://twitter.com/intent/tweet?text=">Tweet Quote</a>
        </header>
      </div>
    );
  }
}

export default App;
