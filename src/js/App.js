import React from "react";
import "./App.scss";

import Hangman from "./Component/Hangman/Hangman";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gameOver: false,
            isWin: false,
        };

        this.gameOver = this.gameOver.bind(this);
        this.gameWin = this.gameWin.bind(this);
    }
    reload() {
        location.reload();
    }

    gameOver() {
        this.setState((state) => {
            return {
                gameOver: true,
            };
        });
    }
    gameWin() {
        this.setState((state) => {
            return {
                isWin: true,
                gameOver: true,
            };
        });
    }
    render() {
        const { gameOver, isWin } = this.state;
        const resultClass = `result ${gameOver && "result--show"} ${
            isWin && "result--win"
        }`;
        return (
            <div className="App">
                <Hangman
                    reload={this.reload.bind(this)}
                    gameOver={this.gameOver}
                    gameWin={this.gameWin}
                />
                <div className={resultClass}>
                    <p
                        className={`result__text ${
                            isWin && "result__text--win"
                        }`}
                    >
                        {isWin ? "You win" : "You Lose"}
                    </p>
                    <button
                        className={`result__btn ${isWin && "result__btn--win"}`}
                        onClick={this.reload}
                    >
                        Play again?
                    </button>
                </div>
            </div>
        );
    }
}

export default App;
