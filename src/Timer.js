import React from 'react';

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { time: 180 }
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
        return (
        <div className="timer">{Math.floor(this.state.time/60)}:{this.state.time%60}</div>
        )
    }
}

export default Timer;