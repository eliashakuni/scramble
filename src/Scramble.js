import React from 'react';
import './Scramble.css';
import Table from './Table.js';
import Timer from './Timer.js'
import ListView from './ListView.js'

class Scramble extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstTime: true,
            newTableLoaded: true, //should be false
            active: false,
            path: [],
            table: [["A", "B", "C", "D"], ["E", "F", "G", "H"], ["I", "J", "K", "L"], ["M", "N", "O", "P"]], //should be without the letters
            nextTable: [["A", "B", "C", "D"], ["E", "F", "G", "H"], ["I", "J", "K", "L"], ["M", "N", "O", "P"]], //should be empty array
            wordList: ["asdf", "jklö"], //should be [""]
            currentWord: "",
            latestWord: ["", true],
            correctList: [],
            incorrectList: []
        };
        this.endGame = this.endGame.bind(this);
        this.startGame = this.startGame.bind(this);
        this.handleBackspaceClick = this.handleBackspaceClick.bind(this);
    }

    componentDidMount() {
        //this.loadNewTable();
    }

    startGame() {
        if (this.state.active || !this.state.newTableLoaded) {
            return;
        }
        this.setState({ firstTime: false, active: true, correctList: [], incorrectList: [], path: [], table: this.state.nextTable, wordList: this.state.nextWordList, newTableLoaded: false })
        this.loadNewTable();
    }

    endGame(reason) {
        if (this.state.correctList.length && reason === "button") {
            if (!window.confirm("Haluatko varmasti päättää tämän pelikerran?")) {
                return;
            }
        }
        this.setState({ active: false, currentWord: "", path: [] })
    }

    loadNewTable() {
        this.setState({ newTableLoaded: true });
        /* fetch(
            'http://hakuni.se/scramble/php/scramble.php',
            { method: 'GET' }
        )
            .then(response => response.json())
            .then((response) => { this.setState({ nextTable: response.table, nextWordList: response.wordList, newTableLoaded: true });}
            ); */
    }

    handleTableClick = (position) => {
        if (!this.state.active) {
            return;
        }
        if (this.state.path.length) {
            if (Math.abs(this.state.path[this.state.path.length - 1][0] - position[0]) > 1 || Math.abs(this.state.path[this.state.path.length - 1][1] - position[1]) > 1 || this.state.path.includes(position)) {
                if (position === this.state.path[this.state.path.length - 1]) {
                    this.handleBackspaceClick();
                }
                return;
            }
        }
        let clickedLetter = this.state.table[position[0]][position[1]].toLowerCase();
        this.setState({ currentWord: this.state.currentWord + clickedLetter, path: this.state.path.concat(position) })
    }

    handleBackspaceClick() {
        this.setState({
            currentWord: this.state.currentWord.slice(0, this.state.currentWord.length - 1),
            path: this.state.path.slice(0, this.state.path.length - 1)
        });
    }

    handleSendClick = () => {
        if (this.state.currentWord.length < 3) {
            return;
        }
        if (this.state.incorrectList.includes(this.state.currentWord) || this.state.correctList.includes(this.state.currentWord)) {
            this.setState({ currentWord: "", path: []});
            return;
        }
        let newState = {};
        let currentWord = [this.state.currentWord];
        if (this.state.wordList.includes(this.state.currentWord)) {
            newState = { correctList: currentWord.concat(this.state.correctList), latestWord: [this.state.currentWord, true] };
        } else {
            newState = { incorrectList: currentWord.concat(this.state.incorrectList), latestWord: [this.state.currentWord, false] };
        }
        newState = Object.assign(newState, { currentWord: "", path: [] });
        this.setState(newState);
    }

    render() {
        return (
            <div className="page">
                <div className="wrapper">
                    {/* <input type="chechbox"></input> */}
                    <div className={this.state.active ? "backspace hoverable" : "disabled-button backspace"} onClick={this.handleBackspaceClick}><p>⬅</p></div>
                    <p className="current-word">{this.state.currentWord}</p>
                    <div>{this.state.time}</div>
                    <button className="latest-word">{this.state.latestWord}</button>
                    <div className={(this.state.active || !this.state.newTableLoaded) ? "new-game disabled-button" : "new-game hoverable"} onClick={this.startGame}>Uusi peli</div>
                    <div className="results-container"><div className={this.state.active ? "results hoverable" : "results disabled-button"} onClick={this.endGame}>Tulokset</div></div>
                    {this.state.active ? <Timer endGame={this.endGame} /> : null}
                    <Table table={this.state.table} onClick={this.handleTableClick} path={this.state.path} active={this.state.active} firstTime={this.state.firstTime} />
                    <div className={this.state.active ? "send-word hoverable" : "send-word disabled-button"} onClick={this.handleSendClick}>Lähetä</div>
                    {this.state.firstTime ? null : <ListView correctList={this.state.correctList} incorrectList={this.state.incorrectList} wordList={this.state.wordList} active={this.state.active} />}
                </div>
            </div>
        );
    }
}

export default Scramble;