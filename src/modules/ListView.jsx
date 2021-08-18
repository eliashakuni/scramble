import React, { useRef, useEffect } from 'react';

function ListView(props) {
    const listPositionRef = useRef();
    const listScrollRef = useRef();

    useEffect(() => {
        if (props.viewType === "game-active") {
            setTimeout(() => {
                if (listPositionRef.current) {
                    props.updateWordAnimationPositions(listPositionRef.current.getBoundingClientRect(), "list-position")
                }
            }, 550)
        }
        if (props.animation) {
            listScrollRef.current.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        }
    })

    const displayGuessList = () => {
        if (props.guessList.length === 0) {
            return (
                <div className="list-view-container">
                    <ul className="display-list">
                        <li key="list-reference">
                            <p ref={listPositionRef}></p>
                        </li>
                    </ul>
                </div>
            )
        }

        return (
            <div className="list-view-container">
                <ul className="display-list" ref={listScrollRef}>
                    {props.guessList.map((word, index) => {
                        return (<li key={word}
                            className={(props.guessResultList[index] ? "correct-word" : "incorrect-word") + (props.animation ? " list-animation" : "")}
                            style={(props.animation && (index === 0)) ? { visibility: 'hidden' } : {}}>
                            <p ref={(index === 0) ? listPositionRef : null}>{word}</p>
                            <p className={"list-points"}>{
                                props.guessResultList[index] ? 2 ** word.length : -word.length
                            }</p>
                        </li>)
                    })}
                </ul>
            </div>
        );
    }

    const displayEndList = () => {
        return (
            <div className="results-list-view-container">
                <ul className="display-list">
                    {props.wordList.map((word) => {
                        let index = props.guessList.indexOf(word)
                        let wasGuessed = (index !== -1);
                        return (
                            wasGuessed ?
                                <li key={word} className={"correct-word"}>
                                    <a href={"https://www.kielitoimistonsanakirja.fi/#/" + word} rel="noopener noreferrer" target="_blank">{word}</a>
                                    <p>{props.guessResultList[index] ? 2 ** word.length : -word.length}</p>
                                </li>
                                :
                                <li key={word} className="dictionary-word">
                                    <a href={"https://www.kielitoimistonsanakirja.fi/#/" + word} rel="noopener noreferrer" target="_blank">{word}</a>
                                </li>)
                    })}
                    {props.guessList.map((word, index) => {
                        if (!props.guessResultList[index]) {
                            return (<li key={word} className="incorrect-word">
                                <p>{word}</p>
                                <p>{
                                    -word.length
                                }</p>
                            </li>);
                        }
                        return null;
                    })}
                </ul>
            </div>
        );
    }

    return (
        (props.viewType === "results") ? displayEndList() : displayGuessList()
    );
}

export default ListView;