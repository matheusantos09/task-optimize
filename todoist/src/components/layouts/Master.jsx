import React from "react"
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'

import Header from '../Header/Header'
import Footer from '../Footer/Footer'

const MasterLayout = (props) => (
    <div className="App">
        <CssBaseline/>
        <Header/>

        <div className="wrapper-container">
            <Container>
                {props.children}
            </Container>
        </div>

        <Footer/>

    </div>
)

export default MasterLayout