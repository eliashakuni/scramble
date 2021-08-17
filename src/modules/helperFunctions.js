export function wordCounter(guessResultList) {
    let words = 0;
    guessResultList.forEach((word) => {
        if (word) {
            words++;
        }
    });
    return words;
}

export function scoreCounter(guessList, guessResultList) {
    let points = 0;
    guessList.forEach((word, index) => {
        guessResultList[index] ? points += 2 ** (word.length) : points -= (word.length);
    });
    return points;
}

export function grade(correct) {
    if (correct < 0.1) {
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
