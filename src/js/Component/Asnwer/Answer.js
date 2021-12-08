import React, { Component } from "react";
import "./Answer.scss";
class Answer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const li = this.props.answer?.split("").map((e, idx) => {
      return (
        <li
          className={`hangman__answer__item ${
            !this.props.trueKey.includes(e) && `hangman__answer__item--empty`
          }`}
          key={idx}
        >
          {e}
        </li>
      );
    });
    return <ul className="hangman__answer">{li}</ul>;
  }
}

export default Answer;
