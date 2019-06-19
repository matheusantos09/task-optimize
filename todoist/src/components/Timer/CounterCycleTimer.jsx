import React, {Component} from 'react'

class CounterCycleTimer extends Component {

    constructor() {
        super();

        this.state = {
            lines: 4,
            stage: 2
        }
    }

    render() {
        let pause = '';
        let rows = [];

        for (let i = 0; i < this.props.lines; i++) {

            let active = 'active';

            if (i < this.props.stage) {
                active = 'active'
            } else {
                active = ''
            }

            rows.push(<li key={i} className={active}></li>)
        }

        if(this.props.pause){
            pause = this.props.pauseTitle;
        }

        return (
            <div className="counter-cycle">
                <ul>
                    {rows}
                </ul>
                <div className="alert-pause">{pause}</div>
            </div>
        )
    }

}

CounterCycleTimer.defaultProps = {
    lines: 4,
    stage: 1,
    pause: false,
    pauseTitle: 'Pausa'
}

export default CounterCycleTimer;