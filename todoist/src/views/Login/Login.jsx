import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
// import 'react-toastify/dist/ReactToastify.css'
import api from '../../services/api'
import {login} from '../../services/auth'
import {Form, Container} from './Styles'
import {ApiRouteList} from '../../routes.js'

// import {ToastContainer, toast} from 'react-toastify'

class Login extends Component {

    constructor() {
        super();

        this.handleSignIn = this.handleSignIn.bind(this);

    }

    state = {
        email: '',
        password: '',
        error: ''
    }

    // notify = (msg) => toast(msg, {
    //     position: "bottom-right",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    // });

    handleSignIn = async e => {
        e.preventDefault()

        const {email, password} = this.state

        if (!email || !password) {
            this.setState({
                error: 'Por favor preencha a senha e e-mail corretamente'
            });
        } else {

            //@TODO melhorar validações para o login

            await api.post(ApiRouteList.login, {
                email, password
            })
                .then((response) => {

                    if (response.data.error) {
                        throw response;
                    }

                    login(response.data.token, response.data.expires_in)

                    //@TODO Colocar tooltip aqui para exibir que foi feito login

                    this.props.history.push({
                        pathname: '/app',
                        state: {msgWelcome: 'Login feito com sucesso'}
                    })

                })
                .catch((error) => {
                    console.log('CATCH');
                    console.log(error);

                    if (typeof error.data !== 'undefined') {

                        console.log('tete');

                        var msgError = error.data.content ? error.data.content : error.content

                        console.log(error.data.content);

                        this.setState({
                            error: `${msgError}`
                        })

                    } else {

                        this.setState({
                            error: 'Estamos com problema para autenticar você tente novamente mais tarde'
                        })

                    }

                });

        }

    }

    render() {
        return (
            <Container>
                <Form onSubmit={this.handleSignIn}>
                    {/* @TODO criar logo */}

                    {this.state.error && <p>{this.state.error}</p>}

                    <input
                        type="email"
                        placeholder="Endereço de e-mail"
                        onChange={e => this.setState({email: e.target.value})}
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        onChange={e => this.setState({password: e.target.value})}
                    />
                    <button type="submit">Entrar</button>
                    <hr/>
                    <Link to="/signup">Criar conta grátis</Link>
                </Form>
                {/*@TODO colocar Toast*/}
                {/*<ToastContainer*/}
                {/*    position="bottom-right"*/}
                {/*    autoClose={5000}*/}
                {/*    hideProgressBar={false}*/}
                {/*    newestOnTop={false}*/}
                {/*    closeOnClick*/}
                {/*    rtl={false}*/}
                {/*    pauseOnVisibilityChange*/}
                {/*    draggable*/}
                {/*    pauseOnHover/>*/}
            </Container>
        );
    }
}

export default withRouter(Login)