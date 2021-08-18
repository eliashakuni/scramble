import MenuWindow from "./MenuWindow.jsx"
import React from "react";
import "../css/Scramble.css";
import GameView from "./GameView.jsx"
import WordAnimation from "./WordAnimation.jsx"

class Scramble extends React.Component {
    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef();
        this.wordAnimationPositions = [{ x: 0, y: 0 }, { x: 0, y: 0 }, false, { x: 0, y: 0 }]; // [currentWord, firstListChild, isFirstListChild set?, wrapper]
        this.firstTime = true;
        this.state = {
            newTableLoaded: false,
            currentView: "new-game",
            table: [
                ["", "", "", ""],
                ["", "", "", ""],
                ["", "", "", ""],
                ["", "", "", ""],
            ],
            nextTable: [],
            wordList: [],
            nextWordList: [],
            guessList: [],
            guessResultList: [],
            maxPoints: 0,
            menuWindowType: "",
            animation: false,
            screenSize: [window.innerWidth, window.innerHeight]
        };
    }

    handleResize = () => {
        this.wordAnimationPositions[2] = false;
        this.wordAnimationPositions[3] = this.wrapperRef.current.getBoundingClientRect();
        this.setState({ screenSize: [window.innerWidth, window.innerHeight] });
    }

    componentDidMount() {
        this.loadNewTable();
        window.addEventListener('resize', this.handleResize);
        this.wordAnimationPositions[3] = this.wrapperRef.current.getBoundingClientRect();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize)
    }

    newGame = () => {
        this.setState({
            currentView: "new-game",
            guessList: [],
            guessResultList: []
        });
    }

    startGame = () => {
        if (this.state.newTableLoaded) {
            this.setState({
                currentView: "game-active",
                newTableLoaded: false,
                table: this.state.nextTable,
                wordList: this.state.nextWordList
            });
            this.firstTime = false;
            this.loadNewTable();
        }
    }

    results = () => {
        this.setState({ currentView: "results" });
    }

    loadNewTable() {
        fetch(
            'http://hakuni.se/scramble/php/scramble.php',
            { method: 'GET' }
        )
            .then(response => response.json())
            .then((response) => { this.setState({ nextTable: response.table, nextWordList: response.wordList, newTableLoaded: true, maxPoints: response.points }); })
            .then(() => { if (!this.state.wordList.length) { this.newGame(); } });
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
                <div ref={this.wrapperRef} className="wrapper" style={{
                    '--position-start-x': ((this.wordAnimationPositions[0].x - this.wordAnimationPositions[3].x) + 'px'),
                    '--position-start-y': ((this.wordAnimationPositions[0].y - this.wordAnimationPositions[3].y) + 'px'),
                    '--position-end-x': ((this.wordAnimationPositions[1].x - this.wordAnimationPositions[3].x) + 'px'),
                    '--position-end-y': ((this.wordAnimationPositions[1].y - this.wordAnimationPositions[3].y) + 'px'),
                }}>
                    {/* <div className={this.state.active ? "backspace hoverable" : "backspace disabled-button"} onClick={this.handleBackspaceClick}>
                        <p>⬅</p>
                    </div> */}
                    <GameView viewType={"new-game"}
                        firstTime={this.firstTime}
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