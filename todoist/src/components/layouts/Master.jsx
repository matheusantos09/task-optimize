import React from "react"
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'

import Header from '../Header/Header'
import Footer from '../Footer/Footer'

const MasterLayout = (props) => (
    <div className="App">
        <CssBaseline/>
        <Header/>

        <Container>
            {props.children}
        </Container>

        <Footer/>

    </div>
)

export default MasterLayout