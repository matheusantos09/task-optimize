import React from 'react';
import './assets/scss/App.scss';

/* Import fonts and styles */
import 'typeface-roboto'
import 'normalize.css'

import MasterLayout from './components/layouts/Master'
import LoginForm from './components/pages/Login/Login'

function App() {
    return (
        <MasterLayout>
            <LoginForm/>
        </MasterLayout>
    );
}

export default App;
