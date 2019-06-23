import React, {Component} from 'react'
import {logout} from "../../services/auth"
import MasterLayout from "../../components/layouts/Master";

class Logout extends Component{

    componentDidMount() {
        logout()

        setTimeout(function () {
            this.props.history.push({
                pathname: '/',
            })
        }.bind(this),2000);

    }

    render(){
        return(
            <MasterLayout>
                <div className="logout-page">Saindo do sistema...</div>
            </MasterLayout>
        )
    }

}

export default Logout