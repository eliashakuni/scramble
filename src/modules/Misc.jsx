import React from "react";
import Timer from "./Timer.jsx";
import { scoreCounter, wordCounter, grade } from "./helperFunctions.js"

const Misc = (props) => {
    let hamburgerSize = (props.screenSize[0] > props.screenSize[1]) ? (props.screenSize[1] / 15).toString() : (props.screenSize[0] / 11).toString(); //SVG hamburger-menu figure size

    const createTimer = () => {
        if (props.viewType === "game-active") {
            return (
                (props.currentView === "game-active") ? <Timer endGame={props.results} /> : <div className="timer">
                    <span>0</span>
                    <span>0</span>
                    <span className="timer-colon">:</span>
                    <span>0</span>
                    <span>0</span>
                </div>
            )
        }
        return (
            null
        )
    }

    let score = scoreCounter(props.guessList, props.guessResultList);

    return (
        <div className="misc-container">
            <div className="timer-and-score-container">
                <p className="points">Pisteet: {score}/{props.maxPoints}</p>
                {createTimer()}
                <p className="words">Sanat: {wordCounter(props.guessResultList)}/{props.wordList.length}</p>
                {(props.viewType === "results") ?
                    <p className="grade">Tulos: {grade(score / props.maxPoints)}</p>
                    : null}
            </div>
            <div className="menu-button-container">
                <button className="menu-button hoverable" onClick={() => props.handleMenuWindowChange("main-menu")}>
                    <svg viewBox="0 0 60 60" width={hamburgerSize} height={hamburgerSize}>
                        <rect y="5" width="60" height="10" rx="4"></rect>
                        <rect y="25" width="60" height="10" rx="4"></rect>
                        <rect y="45" width="60" height="10" rx="4"></rect>
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default Misc;