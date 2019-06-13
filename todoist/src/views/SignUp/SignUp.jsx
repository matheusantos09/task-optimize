import React, {Component} from 'react'
import {Link, withRouter} from "react-router-dom"

//Import do logo @TODO ver logo depois

import {Form, Container} from "./Styles";
import api from '../../services/api'
import {login} from "../../services/auth";
import {ApiRouteList} from '../../routes.js'

class SignUp extends Component {

    constructor() {
        super();

        this.handleSignUp = this.handleSignUp.bind(this);

    }

    state = {
        name: '',
        email: '',
        password: '',
        error: '',
    }

    handleSignUp = async e => {
        e.preventDefault();

        const {name, email, password} = this.state;

        if (!name || !email || !password) {
            this.setState({
                error: 'Preencha todos os dados corretamente'
            })
        } else {
            await api.post(ApiRouteList.signup.path, {
                name, email, password
            })
                .then(function (response) {

                    if (response.data.error) {
                        throw response.data;
                    }

                    login(response.data.token)

                    //@TODO Colocar tooltip aqui para exibir que foi feito cadastro
                    this.props.history.push('/app')

                }.bind(this))
                .catch((error) => {

                    console.log('CATCH');
                    console.log(error.response.data.content);

                    var msgError = error.response.data.content ? error.response.data.content : error.content
                    this.setState({
                        error: `${msgError}`
                    })

                });

        }

    };

    render() {
        return (
            <Container>
                <Form onSubmit={this.handleSignUp}>

                    {/*@TODO LOGO FUTURO*/}

                    {this.state.error && <p>{this.state.error}</p>}

                    <input type="text"
                           placeholder="Seu nome"
                           onChange={e => this.setState({name: e.target.value})}
                    />

                    <input type="email"
                           placeholder="E-mail"
                           onChange={e => this.setState({email: e.target.value})}
                    />

                    <input type="password"
                           placeholder="Senha"
                           onChange={e => this.setState({password: e.target.value})}
                    />

                    <button type="submit">Registrar</button>
                    <hr/>
                    <Link to='/'> Fazer login </Link>

                </Form>
            </Container>
        )
    }
}

// export default SignUp
export default withRouter(SignUp)
