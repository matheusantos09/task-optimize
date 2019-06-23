import React, {Component} from 'react'
import CountDown, {CountdownContext} from 'react-countdown-component'
import api from "../../services/api";
import {ApiRouteList} from "../../routes";
import {showNotification} from '../Notification/WebNotification'
import CounterCycleTimer from './CounterCycleTimer'
import {PlayCircleFilledRounded, PauseCircleFilledRounded} from '@material-ui/icons'

function convertMintoMs(min) {
    return (min * 60) * 1000;
}

const MessagesTimer = {
    defaultCycle: 'Vamos focar e realizar nossos objetivos',
    pauseCycle: 'Agora vamos ver oque fazemos e ter um breve descanso',
    longPause: 'Merecemos um descanso maior agora para nos organizar para o próximo ciclo'
}

const CycleTimer = {
    1: {
        time: 25,
        message: MessagesTimer.defaultCycle,
        pause: false,
        stage: 1
    },
    2: {
        time: 5,
        message: MessagesTimer.pauseCycle,
        pause: true,
        stage: 1
    },
    3: {
        time: 25,
        message: MessagesTimer.defaultCycle,
        pause: false,
        stage: 2
    },
    4: {
        time: 5,
        message: MessagesTimer.pauseCycle,
        pause: true,
        stage: 2
    },
    5: {
        time: 25,
        message: MessagesTimer.defaultCycle,
        pause: false,
        stage: 3
    },
    6: {
        time: 5,
        message: MessagesTimer.pauseCycle,
        pause: true,
        stage: 3
    },
    7: {
        time: 25,
        message: MessagesTimer.defaultCycle,
        pause: false,
        stage: 4
    },
    8: {
        time: 30,
        message: MessagesTimer.longPause,
        pause: true,
        stage: 4
    },
}

class Timer extends Component {

    constructor() {
        super()

        var lines = Object.keys(CycleTimer).length / 2

        this.state = {
            counter: {
                hours: 0,
                minutes: 0,
                seconds: 0,
                millis: 0,
                totalMs: 0
            },
            counterInit: convertMintoMs(0),
            cycleEvent: 0,
            lines: lines,
            stage: 1,
            pause: false,
            firstSnooze: true,
            startIcon: true
        }

        this.handleFinish = this.handleFinish.bind(this);

    }

    componentWillMount() {
        this.setState({
            counter: {
                hours: 0,
                minutes: CycleTimer[1].time,
                seconds: 0,
                millis: 0,
                totalMs: 0
            },
            counterInit: convertMintoMs(CycleTimer[1].time),
            cycleEvent: 1
        })
    }

    handleCounterUpdate = (time) => {
        this.setState({
            counter: {
                hours: time.hours,
                minutes: time.minutes,
                seconds: time.seconds,
                millis: time.millis,
                totalMs: time.totalMs
            },
        });
    };

    handleNewEvent = (event) => {

        switch (event) {
            case 'start':
                this.sendEventCycle('START');

                this.setState({
                    startIcon: false
                })

                if (this.state.firstSnooze) {

                    api.post(ApiRouteList.startSnooze);

                    this.setState({
                        firstSnooze: false
                    })
                }
                break;

            case 'pause':
                this.sendEventCycle('PAUSE');

                this.setState({
                    startIcon: true
                })

                api.post(ApiRouteList.endSnooze);
                break;

            case 'stop':
                this.sendEventCycle('STOP');

                this.setState({
                    startIcon: true
                })

                break;

            case 'reset':
                this.sendEventCycle('RESET');
                break;

            default:
                console.log('Default')
                break
        }

    }

    handleVerifyTime(value) {
        this.handleCounterUpdate(value);
    }

    handleFinish() {

        var cycleRound = Object.keys(CycleTimer).length,
            cycleCurrent = this.state.cycleEvent;

        if (cycleCurrent === cycleRound) {
            showNotification('Parabéns você completou um ciclo', 'Não desista sempre mantendo o foco')
            // @TODO colocar algo para salva quando ele terminar um ciclo todo do pomodoro
            cycleCurrent = 0;
        }
        cycleCurrent += 1;

        this.handleCounterUpdate({
            hours: 0,
            minutes: CycleTimer[cycleCurrent].time,
            seconds: 0,
            millis: 0,
            totalMs: 0,
        })

        this.setState({
            counterInit: convertMintoMs(CycleTimer[cycleCurrent].time),
            cycleEvent: cycleCurrent,
            stage: CycleTimer[cycleCurrent].stage,
            pause: CycleTimer[cycleCurrent].pause,
        })

        if (CycleTimer[cycleCurrent].pause) {

            showNotification('Hora de descansar', 'Aproveite esse tempo para ver tudo que foi feito e preparar as próximas atividades', 'pause');

            api.post(ApiRouteList.endSnooze);

        } else {

            showNotification('Vamos ao trabalho', 'Agora vamos focar em nossas atividades');

            api.post(ApiRouteList.startSnooze);

        }

        this.handleClickStart();

    }

    handleClickStart = () => {
        this.inputStart.click()
    }

    handleClickStop = () => {
        this.inputStop.click()
    }

    // handleClickReset = () => {
    //     this.inputReset.click()
    // }

    sendEventCycle = (event) => {
        api.post(ApiRouteList.eventTimer, {
            event: event,
            cycle: this.state.cycleEvent,
            cycle_time: this.state.counter.minutes
        })
    }

    render() {
        const {minutes, seconds} = this.state.counter;

        return (
            <div>
                <CountDown
                    from={this.state.counter}
                    updateEvery={1000}
                    leftPadding={'0'}
                    onStart={() => this.handleNewEvent('start')}
                    onPause={() => this.handleNewEvent('pause')}
                    onReset={() => this.handleNewEvent('reset')}
                    onUpdate={value => this.handleVerifyTime(value)}
                    onFinish={() => this.handleFinish()}
                >
                    <CountdownContext.Consumer>
                        {(counter) => (
                            <div className='timer-countdown'>
                                <progress
                                    value={this.state.counterInit - this.state.counter.totalMs}
                                    max={this.state.counterInit}
                                >
                                </progress>
                                <h1 className={this.state.startIcon ? '' : 'start-title'}>{minutes}:{seconds}</h1>
                                <div className='list-buttons'>
                                    <button
                                        ref={input => this.inputStart = input}
                                        onClick={counter.playPause}>
                                        {this.state.startIcon ? <PlayCircleFilledRounded/> : <PauseCircleFilledRounded/>}
                                    </button>
                                    {/*<button*/}
                                    {/*    ref={input => this.inputStop = input}*/}
                                    {/*    onClick={counter.pause}>Pause Countdown*/}
                                    {/*</button>*/}
                                    {/*<button*/}
                                    {/*    ref={input => this.inputReset = input}*/}
                                    {/*    onClick = { counter.reset } >Reset Countdown</button>*/}
                                    {/*<button */}
                                    {/*    onClick = { counter.playPause } >Play/Pause Countdown</button>*/}
                                </div>
                            </div>
                        )}
                    </CountdownContext.Consumer>
                </CountDown>
                <CounterCycleTimer lines={this.state.lines} stage={this.state.stage} pause={this.state.pause}/>
            </div>
        )
    }
}

export default Timer