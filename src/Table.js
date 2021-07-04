import React from 'react';

class Table extends React.Component {

    render() {
        return (
            <div className="table">
                {renderTable(this.props)}
            </div>
        );
    }
}

function renderTable(props) {
    let table = [];
    props.table.forEach((row, rowNumber) => {
        row.forEach((letter, letterNumber) => {
            let squareStr = rowNumber.toString() + letterNumber.toString();
            table.push(
                <button className={squareClassName(squareStr, props.path, props.active)}
                    onClick={() => props.onClick(squareStr)}
                    key={squareStr}
                    style={{ gridArea: "p" + squareStr }}>
                    {props.firstTime ? "" : letter}
                </button>
            )
            return;
        })
        return;
    })
    return table;
}

function squareClassName(position, path, active) {
    let squareType = "square";
    if (!active) {
        return squareType + " disabled-button";
    }
    if (!path.length) {
        return squareType + " square-clickable hoverable";
    }
    if (path[path.length - 1] === position) {
        squareType += " square-current";
    } else if (path.includes(position)) {
        squareType += " square-path";
    } else if (Math.abs(path[path.length - 1][0] - position[0]) <= 1 && Math.abs(path[path.length - 1][1] - position[1]) <= 1) { //check if in a neighbour square to the current (meaning, if it's clickable)
        squareType += " square-clickable hoverable";
    } else {
        squareType += " square-non-clickable";
    }
    return squareType;
}

export default Table;