import React, { Component } from "react";
import printAlphabet from "../../Helper/printAlphabet";
import "./Choice.scss";
class Choice extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <ul className="hangman__choice">{this.state.alphabet}</ul>;
  }
}

export default Choice;
