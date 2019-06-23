import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import api from '../../services/api'
import {login} from '../../services/auth'
import {ApiRouteList} from '../../routes.js'
import {Grid, FormControl, FormGroup, TextField} from "@material-ui/core"
import iconSystem from '../../assets/img/clock.svg'

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
            <div className="form-login">
                <form onSubmit={this.handleSignIn}>
                    <Grid container alignContent={"center"} alignItems={"center"}>

                        <Grid item xs={12} md={12} lg={12}>
                            <img src={iconSystem} alt="Ícone do sistema" className="icon"/>
                        </Grid>

                        <Grid item xs={12} md={12} lg={12}>
                            {this.state.error && <div className="error-message">{this.state.error}</div>}
                        </Grid>

                        <Grid item xs={12} md={12} lg={12}>
                            <FormGroup>
                                <FormControl>
                                    <TextField
                                        label="Endereço de e-mail"
                                        name="email"
                                        type="email"
                                        value={this.state.password_confirmation}
                                        onChange={e => this.setState({email: e.target.value})}
                                    />
                                </FormControl>
                            </FormGroup>
                        </Grid>

                        <Grid item xs={12} md={12} lg={12}>
                            <FormGroup>
                                <FormControl>
                                    <TextField
                                        label="Senha"
                                        type="password"
                                        name="password"
                                        onChange={e => this.setState({password: e.target.value})}
                                    />
                                </FormControl>
                            </FormGroup>
                        </Grid>

                        <Grid item xs={12} md={12} lg={12} >
                            <button
                                type="submit">
                                Entrar
                            </button>
                        </Grid>

                        <Grid item xs={12} md={12} lg={12}>
                            <div className="link-create"><Link to="/signup">Criar conta grátis</Link></div>
                        </Grid>

                    </Grid>
                </form>
            </div>
        );
    }
}

export default withRouter(Login)