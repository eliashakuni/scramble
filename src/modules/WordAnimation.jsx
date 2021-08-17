const WordAnimation = (props) => {
    const createWordAnimation = () => {
        if (props.animation) {
            return (
                <div className="animation-word">
                    <p className="animation-word-over">{props.word}</p>
                    <p className={props.correct ? "animation-word-correct" : "animation-word-incorrect"}>{props.word}</p>
                </div>
            );
        }
        return (null);
    }

    return (
        createWordAnimation()
    );
}

export default WordAnimation;