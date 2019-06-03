import React, {Component} from 'react'
import InputText from '../../partials/InputText'
import ContainedButton from '../../partials/ContainedButton'
import axios from 'axios'
import PubSub from 'pubsub-js'

const url = 'http://127.0.0.1:9999';

class LoginForm extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: ''
        }
        this.submitForm = this.submitForm.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setPassword = this.setPassword.bind(this);

    }

    setEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    setPassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    submitForm(e) {
        e.preventDefault();

        axios.post(url + '/test', {
            'teste': 'teste'
        })
            .then(function(response) {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then(function(response) {
                console.log(response);
            })
            .catch(function(error) {
                console.log(error);
            });

        // $.ajax({
        //     url: 'http://cdc-react.herokuapp.com/api/autores',
        //     contentType: 'application/json',
        //     dataType: 'json',
        //     method: 'POST',
        //     data: JSON.stringify({
        //         nome: this.state.nome,
        {/*        email: this.state.email,*/}
        {/*        senha: this.state.senha*/}
        {/*    }),*/}
        //     success: function (novaListagem) {
        //         PubSub.publish('atualiza-lista-autores',novaListagem);
        //
        //         this.setState({
        //             nome: '',
        //             email: '',
        //             senha: ''
        //         });
        //
        //     }.bind(this),
        //     error: function (resposta) {
        //         if(resposta.status === 400){
        //             new TratadorErros().publicaErros(resposta.responseJSON);
        //         }
        //     },
        //     beforeSend: function(){
        //         PubSub.publish("limpa-erros",{});
        //     }
        //
        // })

        alert('SUBMIT');
    }

    render() {

        return (
            <form onSubmit={this.submitForm} className="form-login">
                <InputText type="email" name="email" label="E-mail" value={this.state.email} onChange={this.setEmail}/>
                <InputText type="password" name="password" label="Senha" value={this.state.password} onChange={this.setPassword}/>
                <ContainedButton text="Entrar" color="primary"/>
            </form>
        )
    }

}


export default LoginForm;