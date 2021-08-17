import { useState } from "react";
import Table from "./Table.jsx";
import ListView from "./ListView.jsx";
import Misc from "./Misc.jsx"


const GameView = (props) => {
    const [showView, setShowView] = useState(props.viewType === props.currentView)

    let typeIsCurrent = (props.viewType === props.currentView);

    if (typeIsCurrent && !showView) {
        setShowView(true);
    }

    if (!typeIsCurrent && showView) {
        setTimeout(() => { setShowView(false) }, 500)
    }

    if (!showView) {
        return null;
    }

    const createGrid = () => {
        if ((props.viewType === "game-active") && (props.screenSize[0] > props.screenSize[1])) {
            return ({
                gridTemplateColumns: "1fr " + (props.screenSize[1] - 256) + "px 1fr",
                gridTemplateRows: "8rem 1fr 8rem",
                gridTemplateAreas: "'current-word current-word current-word' 'misc-container table list-view-container' 'misc-container send-word list-view-container'",
            })
        }
        return {};
    }

    const createGameView = () => {
        if (props.viewType === "game-active" || props.viewType === "results") {
            return (
                <div className={props.viewType + (typeIsCurrent ? " view-in" : " view-out")}
                    style={createGrid()}>
                    <Misc viewType={props.viewType}
                        currentView={props.currentView}
                        guessList={props.guessList}
                        guessResultList={props.guessResultList}
                        wordList={props.wordList}
                        maxPoints={props.maxPoints}
                        screenSize={props.screenSize}
                        results={props.results}
                        handleMenuWindowChange={props.handleMenuWindowChange} />
                    <ListView viewType={props.viewType}
                        guessList={props.guessList}
                        guessResultList={props.guessResultList}
                        wordList={props.wordList}
                        showResults={props.showResults}
                        updateWordAnimationPositions={props.updateWordAnimationPositions}
                        animation={props.animation} />
                    <Table viewType={props.viewType}
                        table={props.table}
                        active={props.active}
                        handleSendClick={props.handleSendClick}
                        updateWordAnimationPositions={props.updateWordAnimationPositions} />
                </div>
            )
        }
        return (
            <div className={"new-game-view" + (typeIsCurrent ? " view-in" : " view-out")}>
                <button className={"new-game-button" + (!props.newTableLoaded ? " disabled-button" : " hoverable")} onClick={props.startGame}>
                    {props.newTableLoaded ? "Aloita" : "Ladataan..."}
                </button>
            </div>
        )
    }

    return (
        createGameView()
    )
}

export default GameView;