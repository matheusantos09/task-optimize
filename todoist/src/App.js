import React, {Component} from 'react'
import Routes from './routes'
import './assets/scss/App.scss'
import {ToastContainerCustom} from "./components/Notification/Notify"

/* Import fonts and styles */
import 'typeface-roboto'
import 'normalize.css'
import 'react-toastify/dist/ReactToastify.css'

class App extends Component {

    render() {
        return (
            <div>
                <Routes/>

                <ToastContainerCustom/>

            </div>
        );
    }

}

export default App;
