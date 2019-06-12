import React from 'react'
import Routes from './routes'
import './assets/scss/App.scss'

/* Import fonts and styles */
import 'typeface-roboto'
import 'normalize.css'

// import MasterLayout from './components/layouts/Master'
// import LoginForm from './components/pages/Login/Login'

function App() {
    return (
        //<MasterLayout>
            <Routes />
            // <LoginForm/>
        // </MasterLayout>
    );
}

export default App;
