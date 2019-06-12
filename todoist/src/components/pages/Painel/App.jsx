import React, {Component} from 'react'
import MasterLayout from '../../layouts/Master'
import { Link } from 'react-router-dom'
import Solo from '../Solo/Solo'

class App extends Component{

    render(){
        return(
            <MasterLayout>

                <Link to='/app/solo'> Solo </Link>
                <Link to='/app/grupo'> Grupo </Link>

            </MasterLayout>
        )
    }

}

export default App