import React, { Component } from "react";
import "./Question.scss";
class Question extends Component {
  render() {
    return <p className="hangman__question">{this.props?.question}</p>;
  }
}

export default Question;
