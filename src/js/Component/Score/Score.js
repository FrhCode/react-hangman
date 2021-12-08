import React, { Component } from "react";
import "./Score.scss";
class Score extends Component {
  render() {
    return <p className="hangman__score">Wrong guessse: 0 of 6</p>;
  }
}

export default Score;
