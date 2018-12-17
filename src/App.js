import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      data: []
    }
  }

  getInitialState = () => {
    return {
      color: [50, 100, 150]
    };
  }

  formatColor = (ary) => {
    return 'rgb(' + ary.join(', ') + ')';
  }

  isBackDark = () => {
    let rgb = this.state.color;
    return rgb.reduce(function(a,b){ return a+b;}) < 127 * 3;
  }

  applyColor = () => {
    let color = this.formatColor(this.state.color);
    document.body.style.background = color;
  }

  chooseColor = () => {
    for (let i = 0, random = []; i < 3; i++) {
      random.push(Math.floor(Math.random()*256));
    }
    return random; 
  }
  
  handleClick = () => {
    this.setState({
      color: this.chooseColor()
    });
  }

  fetchData = () => {
    fetch('https://talaikis.com/api/quotes/random/')
      .then(results => results.json())
      .then(results => this.setState({data: results}));
  }

  componentDidMount() {
    this.fetchData();
    this.applyColor();
  }

  componentDidUpdate(prevProps, prevState) {
    this.applyColor();
  }

  render() {
    return (
      <div id="quote-box">
        <header className="App-header">
          <h1>
            Random Quote Generator
          </h1>
          <div className="quote-container">
          <p id="text">{this.state.data.quote}</p>
          <p id="author">{this.state.data.author}</p>
          </div>
          <button id="new-quote" onClick={this.fetchData}>New Quote</button>
          <button>
          <a id="tweet-quote" href={"https://twitter.com/intent/tweet?text=" + this.state.data.quote + " ~ " + this.state.data.author}>Tweet Quote</a>
          </button>
        </header>
      </div>
    );
  }
}

export default App;
