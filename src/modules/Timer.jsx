import React from 'react';

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { time: 5999 }
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            this.setState({ time: this.state.time - 1 })
            if (this.state.time <= 0) {
                this.props.endGame();
            }
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        let minutes = Math.floor(this.state.time / 60).toString();
        let seconds = (this.state.time % 60).toString();
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        return (
            <div className="timer">
                <span>{minutes[0]}</span>
                <span>{minutes[1]}</span>
                <span className="timer-colon">:</span>
                <span>{seconds[0]}</span>
                <span>{seconds[1]}</span>
            </div>
        )
    }
}

export default Timer;