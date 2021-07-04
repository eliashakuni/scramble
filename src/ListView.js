import React from 'react';

class ListView extends React.Component {
    twoLists() {
        return (
            <div className="list-view">
                <div className="correct-list">
                    {this.props.correctList.map((word) => {
                        return (<div key={word} className="word-container" ><p className="correct-word">{word}, </p></div>)
                    })}
                </div>
                <div className="incorrect-list">
                    {this.props.incorrectList.map((word) => {
                        return (<div key={word} className="word-container" ><p key={word} className="incorrect-word">{word}, </p></div>)
                    })}
                </div>
            </div>
        );
    }

    endList() {
        let points = 1234 //scoreCounter(this.props.correctList);
        let maxPoints = 2345 //scoreCounter(this.props.wordList);
        return (
            <div className="list-view">
                <div className="end-list">
                    {this.props.wordList.map((word) => {
                        return (<div key={word} className="word-container" ><a className={this.props.correctList.includes(word) ? "correct-word" : "end-word"} href={'https://www.kielitoimistonsanakirja.fi/#/' + word} target="_blank" rel="noopener noreferrer">{word},</a></div>)
                    })/*remove div??*/} 
                    <div className="points" ><p>Pisteet: {points}, maxpisteet: {maxPoints}, tulos: {Math.round(100 * points / maxPoints)}%, arvosana: {grade(points/maxPoints)}</p></div>
                </div>
            </div>
        );
    }

    render() {
        return (
            this.props.active ? this.twoLists() : this.endList()
        );
    }
}

function grade(correct) {
    if(correct < 0.1) {
        return "surkea";
    } else if (correct < 0.2) {
        return "kehno"
    } else if (correct < 0.3) {
        return "siedettävä"
    } else if (correct < 0.4) {
        return "hyväksytty"
    } else if (correct < 0.5) {
        return "kohtalainen"
    } else if (correct < 0.6) {
        return "hyvä"
    } else if (correct < 0.7) {
        return "erittäin hyvä"
    } else if (correct < 0.8) {
        return "loistava"
    } else if (correct < 0.9) {
        return "eliitti"
    } else if (correct < 1) {
        return "nero"
    }
    return "köh?"
}

// function scoreCounter(wordList) {
//     let points = 0;
//     wordList.forEach(word => {
//         points += 2 ** (word.length);
//     });
//     return points;
// }

export default ListView;