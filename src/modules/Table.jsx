import { useState, useRef, useEffect } from 'react';

function Table(props) {
    const [state, setState] = useState({ word: "", path: [] });
    const currentWordRef = useRef();

    useEffect(() => {
        if (active) {
            props.updateWordAnimationPositions(currentWordRef.current.getBoundingClientRect(), "current-word");
        }
    })

    let active = (props.viewType === "game-active")

    if (!active && (state.word !== "")) {
        setState({ word: "", path: [] })
    }

    var tableAssembly = [];
    props.table.forEach((row, rowNumber) => {
        row.forEach((letter, letterNumber) => {
            let squareStr = rowNumber.toString() + letterNumber.toString();
            tableAssembly.push(
                <div className="square-container" style={{ gridArea: "p" + squareStr }} key={squareStr}>
                    <button className={squareClassName(squareStr, state.path, props.viewType, "over-")}
                        onClick={() => handleTableClick(squareStr)}>
                        {letter}
                    </button>
                    <button className={squareClassName(squareStr, state.path, props.viewType, "under-")}>
                        {letter}
                    </button>
                </div>
            )
        })
    })

    const handleTableClick = (position) => {
        if (!active) {
            return;
        }
        if (state.path.length) {
            if (position === state.path[state.path.length - 1]) {
                handleBackspaceClick(state, setState);
                return;
            }
            if (
                Math.abs(state.path[state.path.length - 1][0] - position[0]) >
                1 ||
                Math.abs(state.path[state.path.length - 1][1] - position[1]) >
                1 ||
                state.path.includes(position)
            ) {
                return;
            }
        }
        let clickedLetter =
            props.table[position[0]][position[1]].toLowerCase();
        setState({
            word: state.word + clickedLetter,
            path: state.path.concat(position),
        });
    };

    if (active) {
        return (
            <>
                <div className="current-word-container">
                    <p ref={currentWordRef} className="current-word">{state.word}</p>
                </div>
                <div className="game-table">
                    {tableAssembly}
                </div>
                <button className={state.word.length >= 3 ? "send-word hoverable" : "send-word disabled-button"}
                    onClick={() => {
                        if (state.word.length >= 3) {
                            props.handleSendClick(state.word);
                            setState({ word: "", path: [] })
                        }
                    }}>
                    Lähetä
                </button>
            </>
        );
    }

    return ( //results-view
        <div className="results-table">
            {tableAssembly}
        </div>
    )
}

const handleBackspaceClick = (state, setState) => {
    setState({
        word: state.word.slice(
            0, state.word.length - 1
        ),
        path: state.path.slice(0, state.path.length - 1),
    });
}

function squareClassName(position, path, viewType, layer) {
    let squareType = layer + "square";
    if (viewType === "results") {
        return squareType;
    }
    if (!path.length) {
        return squareType + " square-clickable hoverable";
    }
    if (path[path.length - 1] === position) {
        squareType += " " + layer + "square-current";
    } else if (path.includes(position)) {
        squareType += " " + layer + "square-path";
    } else if (Math.abs(path[path.length - 1][0] - position[0]) <= 1 && Math.abs(path[path.length - 1][1] - position[1]) <= 1) { //check if in a neighbour square to the current (meaning, if it's clickable)
        squareType += " square-clickable hoverable";
    } else if (layer === "over-") {
        squareType += " square-non-clickable";
    }
    return squareType;
}

export default Table;