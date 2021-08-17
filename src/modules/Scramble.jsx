import MenuWindow from "./MenuWindow.jsx"
import React from "react";
import "../css/Scramble.css";
import GameView from "./GameView.jsx"
import WordAnimation from "./WordAnimation.jsx"

class Scramble extends React.Component {
    constructor(props) {
        super(props);
        this.wordAnimationPositions = [{ x: 0, y: 0 }, { x: 0, y: 0 }, false]; // [currentWord, firstListChild, isFirstListChild set?]
        this.listAnimationDistance = 0;
        this.state = {
            newTableLoaded: true, //should be false
            currentView: "new-game",
            table: [
                ["A", "B", "C", "D"],
                ["E", "F", "G", "H"],
                ["I", "J", "K", "L"],
                ["M", "N", "O", "P"],
            ], //should be without the letters
            nextTable: [
                ["A", "B", "C", "D"],
                ["E", "F", "G", "H"],
                ["I", "J", "K", "L"],
                ["M", "N", "O", "P"],
            ], //should be empty array
            wordList: [],
            guessList: ["qwerty", "dvorak"],
            guessResultList: [true, false],
            maxPoints: 1337,
            menuWindowType: "",
            animation: false,
            screenSize: [window.innerWidth, window.innerHeight]

        };
    }

    handleResize = () => {
        this.wordAnimationPositions[2] = false;
        this.setState({screenSize: [window.innerWidth, window.innerHeight]});
    }

    componentDidMount() {
        //this.loadNewTable();
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize)
    }

    newGame = () => {
        if (!this.state.newTableLoaded) {
            return;
        }
        this.setState({
            currentView: "new-game",
            guessList: [],
            guessResultList: [],
            table: this.state.nextTable,
            wordList: ["abcd", "efgh"], //nextWordList
            newTableLoaded: false,
        });
        this.loadNewTable();
    }

    startGame = () => {
        this.setState({ currentView: "game-active" })
    }

    results = () => {
        this.setState({ currentView: "results" });
    }

    loadNewTable() {
        this.setState({ newTableLoaded: true });
        /* fetch(
                'http://hakuni.se/scramble/php/scramble.php',
                { method: 'GET' }
            )
                .then(response => response.json())
                .then((response) => { this.setState({ nextTable: response.table, nextWordList: response.wordList, newTableLoaded: true, maxPoints: response.points});}
                ); */
    }

    handleSendClick = (currentWord) => {
        if (this.state.guessList.includes(currentWord)) {
            return;
        }
        let newGuessList = [currentWord, ...this.state.guessList];
        let newGuessResultList = [...this.state.guessResultList];
        if (this.state.wordList.includes(currentWord)) {
            newGuessResultList.unshift(true);
        } else {
            newGuessResultList.unshift(false);
        }
        this.setState({
            guessList: newGuessList,
            guessResultList: newGuessResultList,
            animation: true
        });
        setTimeout(() => { this.setState({ animation: false }) }, 500);
    };

    handleMenuWindowChange = (menuWindowType) => {
        this.setState({ menuWindowType: menuWindowType });
    }

    updateWordAnimationPositions = (rect, type) => {
        if (type === "current-word") {
            this.wordAnimationPositions[0] = rect;
        }
        if ((type === "list-position") && !this.wordAnimationPositions[2]) {
            this.wordAnimationPositions[1] = rect;
            this.wordAnimationPositions[2] = true;
        }
    }

    render() {
        return (
            <div className="page">
                <div className="wrapper" style={{
                    '--position-start-x': (this.wordAnimationPositions[0].x + 'px'),
                    '--position-start-y': (this.wordAnimationPositions[0].y + 'px'),
                    '--position-end-x': (this.wordAnimationPositions[1].x + 'px'),
                    '--position-end-y': (this.wordAnimationPositions[1].y + 'px'),
                }}>
                    {/* <div className={this.state.active ? "backspace hoverable" : "backspace disabled-button"} onClick={this.handleBackspaceClick}>
                        <p>⬅</p>
                    </div> */}
                    <GameView viewType={"new-game"}
                        currentView={this.state.currentView}
                        newTableLoaded={this.state.newTableLoaded}
                        startGame={this.startGame} />
                    <GameView viewType={"game-active"}
                        currentView={this.state.currentView}
                        table={this.state.table}
                        guessList={this.state.guessList}
                        guessResultList={this.state.guessResultList}
                        wordList={this.state.wordList}
                        maxPoints={this.state.maxPoints}
                        animation={this.state.animation}
                        screenSize={this.state.screenSize}
                        updateWordAnimationPositions={this.updateWordAnimationPositions}
                        handleMenuWindowChange={this.handleMenuWindowChange}
                        handleSendClick={this.handleSendClick}
                        results={this.results} />
                    <GameView viewType={"results"}
                        currentView={this.state.currentView}
                        table={this.state.table}
                        guessList={this.state.guessList}
                        guessResultList={this.state.guessResultList}
                        wordList={this.state.wordList}
                        maxPoints={this.state.maxPoints}
                        newTableLoaded={this.state.newTableLoaded}
                        screenSize={this.state.screenSize}
                        handleMenuWindowChange={this.handleMenuWindowChange}
                        results={this.results} />
                    <MenuWindow menuWindowType={this.state.menuWindowType}
                        currentView={this.state.currentView}
                        newTableLoaded={this.state.newTableLoaded}
                        handleMenuWindowChange={this.handleMenuWindowChange}
                        results={this.results}
                        newGame={this.newGame} />
                    <WordAnimation word={this.state.guessList[0]}
                        correct={this.state.guessResultList[0]}
                        start={this.wordAnimationPositions[0]}
                        end={this.wordAnimationPositions[1]}
                        animation={this.state.animation} />
                </div>
            </div>
        );
    }
}

export default Scramble;