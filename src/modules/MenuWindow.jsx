import { useState } from 'react';

const MenuWindow = (props) => {
    const [currentMenu, setCurrentMenu] = useState("");

    if (props.menuWindowType && (props.menuWindowType !== currentMenu)) {
        setCurrentMenu(props.menuWindowType);
    }

    const menuWindowContent = () => {
        switch (props.menuWindowType) {
            case "main-menu":
                function newGameClick() {
                    if (props.currentView === "game-active") {
                        props.handleMenuWindowChange("new-game-question");
                    }
                    else {
                        props.handleMenuWindowChange("");
                        props.newGame();
                    }
                }
                return (<>
                    <button className="main-menu-button hoverable" onClick={() => newGameClick()}>Uusi peli</button>
                    {(props.currentView === "game-active") ? <button className="main-menu-button hoverable" onClick={() => props.handleMenuWindowChange("results-question")}>Tulokset</button> : null}
                    <button className="main-menu-button hoverable" onClick={() => props.handleMenuWindowChange("")}>Peruuta</button>
                    {/* <button className="main-menu-button hoverable" onClick={() => props.handleMenuWindowChange("language-menu")}>Kielivalinta <span src="../flags/fi.svg" className="flag-icon"></span></button> */}
                </>
                )
            case "results-question":
                return (<>
                    <p>Oletko varma että haluat lopettaa tämänhetkisen pelin ja nähdä tulokset?</p>
                    <button className="main-menu-button hoverable" onClick={() => { props.results(); props.handleMenuWindowChange(""); }}>Tulokset</button>
                    <button className="main-menu-button hoverable" onClick={() => props.handleMenuWindowChange("main-menu")}>Peruuta</button>
                </>
                )
            case "new-game-question":
                return (<>
                    <p>Oletko varma että haluat aloittaa uuden pelin? Tämänhetkinen peli päättyy.</p>
                    <button className={"main-menu-button" + (props.newTableLoaded ? " disabled-button" : " hoverable")} onClick={() => { props.newGame(); props.handleMenuWindowChange(""); }}>Uusi peli</button>
                    <button className="main-menu-button hoverable" onClick={() => props.handleMenuWindowChange("main-menu")}>Peruuta</button>
                </>
                )
            default: {
                return null;
            }
        }
    }

    return (
        <div className={"menu-window" + (props.menuWindowType ? " window-visible" : " window-out")}>
            {menuWindowContent()}
            {/* <MenuWindowContent type={currentMenu}
                newGame={() => props.newGame()}
                handleMenuWindowChange={(menuWindowType) => props.handleMenuWindowChange(menuWindowType)}
                results={() => props.results()}
                newTableLoaded={props.newTableLoaded} /> */}
        </div>
    );
}

export default MenuWindow;