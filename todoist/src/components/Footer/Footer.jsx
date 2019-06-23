import React, {Component} from "react";
import api from '../../services/api'
import {ApiRouteList} from "../../routes";
import Divider from "@material-ui/core/Divider";

class Footer extends Component {

    constructor() {
        super()

        this.state = {
            phase: 'Deixe que seu ritmo guie suas ações'
        }
    }

    loadNewPhase(){
        api.post(ApiRouteList.randomPhase).then((response) => {

            if (response.data.error) {
                throw response;
            }

            this.setState({
                phase: response.data.text
            })

        })
            .catch((error) => {

                this.setState({
                    phase: 'Deixe que seu ritmo guie suas ações'
                })

            });
    }

    componentDidMount() {

        this.loadNewPhase();

        setInterval(function () {

            this.loadNewPhase();

        }.bind(this), 100000);
    }

    render() {
        return (
            <footer>
                <p>{this.state.phase}</p>
                <Divider />
                <p>  &copy; Todos os direitos reservados | Made With Love</p>
            </footer>
        )
    }

}

export default Footer