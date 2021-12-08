import React, { Component } from "react";

import img0 from "../../../static/0.jpg";
import img1 from "../../../static/1.jpg";
import img2 from "../../../static/2.jpg";
import img3 from "../../../static/3.jpg";
import img4 from "../../../static/4.jpg";
import img5 from "../../../static/5.jpg";
import img6 from "../../../static/6.jpg";
import loseSound from "../../../static/lose.wav";
import winSound from "../../../static/win.wav";

import trueSound from "../../../static/true.wav";
import falseSound from "../../../static/false.wav";

import printAlphabet from "../../Helper/printAlphabet";
import "./Hangman.scss";

class Hangman extends Component {
    constructor(props) {
        super(props);

        this.state = {
            alphabet: printAlphabet().map((el, idx) => {
                return (
                    <li className={`hangman__choice__item `} key={el}>
                        {el}
                    </li>
                );
            }),
            qna: [
                {
                    question: "Fruit",
                    answer: "banana",
                },
                {
                    question: "Fruit",
                    answer: "watermelon",
                },
                {
                    question: "food",
                    answer: "rice",
                },
                {
                    question: "food",
                    answer: "burger",
                },
                {
                    question: "color",
                    answer: "black",
                },
                {
                    question: "color",
                    answer: "yellow",
                },
                {
                    question: "color",
                    answer: "red",
                },
                {
                    question: "color",
                    answer: "white",
                },
            ],
            trueKey: new Set(),
            falseKey: new Set(),
            life: 6,
            wrongGuess: 0,
            images: [img0, img1, img2, img3, img4, img5, img6],
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleTrueClick = this.handleTrueClick.bind(this);
        this.handleFalseClick = this.handleFalseClick.bind(this);
    }

    handleTrueClick(key) {
        this.setState(
            (state) => {
                return {
                    trueKey: new Set([...state.trueKey, key]),
                    guessLengh: state.guessLengh + 1,
                };
            },
            () => {
                const { answerLengh, guessLengh } = this.state;
                const music = answerLengh == guessLengh ? winSound : trueSound;
                var audio = new Audio(music);
                audio.play();

                answerLengh == guessLengh && this.props.gameWin();
            }
        );
    }

    handleFalseClick(key) {
        const { wrongGuess } = this.state;
        var music = wrongGuess < 6 ? falseSound : loseSound;
        var audio = new Audio(music);
        audio.play();

        this.setState((state) => {
            return {
                falseKey: new Set([...state.falseKey, key]),
                wrongGuess: state.wrongGuess < 6 ? state.wrongGuess + 1 : 6,
            };
        });
    }

    handleClick(e) {
        const key = e.target.innerHTML;
        const {
            inGameQnA: { answer },
        } = this.state;

        if (answer.includes(key)) this.handleTrueClick(key);
        else this.handleFalseClick(key);

        this.setState((state) => {
            return {
                alphabet: printAlphabet().map((el, idx) => {
                    const { trueKey, falseKey } = state;
                    const className = `hangman__choice__item ${
                        trueKey.has(el) && "hangman__choice__item--true"
                    } ${falseKey.has(el) && "hangman__choice__item--false"} `;
                    return (
                        <button
                            className={className}
                            key={el}
                            onClick={this.handleClick}
                            disabled={
                                trueKey.has(el) || (falseKey.has(el) && true)
                            }
                        >
                            {el}
                        </button>
                    );
                }),
            };
        });

        this.state.wrongGuess == 6 && this.props.gameOver(this.handleClick);
    }

    componentDidMount() {
        // pilih soal dari state.qna
        this.setState((state) => {
            return {
                inGameQnA:
                    state.qna[Math.floor(Math.random() * state.qna.length)],
            };
        });

        // Memberikan kunci yang telah tambil ke dalam true key
        this.setState((state) => {
            return {
                trueKey: new Set(
                    state.inGameQnA.answer.split("").filter((e, idx) => {
                        if (idx % 3 == 0) return e;
                    })
                ),
                answerLengh: new Set(state.inGameQnA.answer.split("")).size,
                guessLengh: new Set(
                    state.inGameQnA.answer.split("").filter((e, idx) => {
                        if (idx % 3 == 0) return e;
                    })
                ).size,
            };
        });

        // untuk setiap button berikan warna biru jika ada di state.trueKey, dan merah jika ada di state.falseKey
        this.setState((state) => {
            const { trueKey, falseKey } = state;
            return {
                alphabet: printAlphabet().map((el, idx) => {
                    const className = `hangman__choice__item ${
                        trueKey.has(el) && "hangman__choice__item--true"
                    } ${falseKey.has(el) && "hangman__choice__item--false"} `;
                    return (
                        <button
                            className={className}
                            key={el}
                            onClick={this.handleClick}
                            disabled={
                                trueKey.has(el) || (falseKey.has(el) && true)
                            }
                        >
                            {el}
                        </button>
                    );
                }),
            };
        });
    }

    render() {
        const { inGameQnA, trueKey, wrongGuess, life, images, alphabet } =
            this.state;
        // Jika key pada answer ada di trueKey maka tampilkan(berika kelas yang bernama hangman__answer__item--show)
        const answer = inGameQnA?.answer?.split("").map((e, idx) => {
            const className = `hangman__answer__item ${
                trueKey.has(e) && `hangman__answer__item--show`
            }`;
            return (
                <li className={className} key={idx}>
                    {e}
                </li>
            );
        });

        return (
            <div className={"hangman"}>
                <h1 className="hangman__title">Hangman Game</h1>
                <p className="hangman__score">
                    Wrong guessse: {wrongGuess} of {life}
                </p>
                <div className="hangman__main">
                    <div className="hangman__img">
                        <img src={images[wrongGuess > 6 ? 6 : wrongGuess]} />
                    </div>
                    <div className="hangman__qna">
                        <p className="hangman__question">
                            {this.state?.inGameQnA?.question}
                        </p>
                        <ul className="hangman__answer">{answer}</ul>
                        <ul className="hangman__choice">{alphabet}</ul>
                        <button
                            className="hangman__reset"
                            onClick={this.props.reload}
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Hangman;
