import React, {Component} from 'react'
import MasterLayout from '../../components/layouts/Master'
import {Link} from 'react-router-dom'

class Painel extends Component {

    render() {
        return (
            <MasterLayout>

                <Link to='/app/solo'> Solo </Link>
                <Link to='/app/grupo'> Grupo </Link>

            </MasterLayout>
        )
    }

}

export default Painel