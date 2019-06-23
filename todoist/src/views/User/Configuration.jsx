import React, {Component} from 'react'
import MasterLayout from "../../components/layouts/Master";
import {
    TextField,
    FormGroup,
    FormControl,
    FormControlLabel,
    Grid,
    FormHelperText,
    Switch,
    Link,
    Typography,
    Button
} from '@material-ui/core'
import api from "../../services/api";
import {ApiRouteList} from "../../routes";
import {notify, ToastContainerCustom} from "../../components/Notification/Notify";

class Configuration extends Component {

    constructor() {
        super()

        this.handleOnChange = this.handleOnChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    state = {
        linkTokenSlack: 'https://api.slack.com/custom-integrations/legacy-tokens',
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        slack_snooze: '',
        slack_token: '',
        notification_email: '',
        notification_news: '',
    }

    componentDidMount() {

        api.get(ApiRouteList.loadConfigUser)
            .then(function (response) {

                if (response.data.error) {
                    throw response;
                }

                this.setState({
                    name: response.data.name,
                    email: response.data.email,
                    password: response.data.password,
                    password_confirmation: response.data.password_confirmation,
                    slack_snooze: response.data.slack_snooze,
                    slack_token: response.data.slack_token,
                    notification_email: response.data.notification_email,
                    notification_news: response.data.notification_news,
                })

            }.bind(this))
            .catch(function (error) {
                console.log('CATCH');
                console.log(error);

                notify({
                    status: 'error',
                    msg: 'Ocorreu um erro ao carregar suas informações tente novamente',
                    time: 3000
                })

            });
    }

    handleOnChange = (type, event) => {
        this.setState({
            [type]: event.target.value
        })
    }

    handleOnChangeSwitch = (type, event) => {
        this.setState({
            [type]: event.target.checked
        });
    };

    handleSubmit(e) {
        e.preventDefault();

        const {name, email, password, password_confirmation, slack_snooze, slack_token, notification_email, notification_news} = this.state;

        console.log(this.state);

        api.post(ApiRouteList.saveConfigUser, {
            name,
            email,
            password,
            password_confirmation,
            slack_snooze,
            slack_token,
            notification_email,
            notification_news
        })
            .then(function (response) {

                if (response.data.error) {
                    throw response;
                }

                notify({
                    msg: 'Dados salvos com sucesso',
                    time: 3000
                })

                this.setState({
                    password: '',
                    password_confirmation: ''
                })

            }.bind(this))
            .catch(function (error) {

                notify({
                    status: 'error',
                    msg: 'Ocorreu um erro ao salvar suas informações tente novamente',
                    time: 3000
                })

            });

    }

    render() {
        return (
            <MasterLayout>
                <form onSubmit={this.handleSubmit}>
                    <Grid container spacing={10}
                    >

                        <Grid item xs={12} sm={12} md={6}>
                            <FormGroup>
                                <FormControl>
                                    <TextField
                                        label="Nome"
                                        name="name"
                                        value={this.state.name}
                                        onChange={(event) => this.handleOnChange('name', event)}
                                    />
                                </FormControl>
                            </FormGroup>
                        </Grid>

                        <Grid item xs={12} sm={12} md={6}>
                            <FormGroup>
                                <FormControl>
                                    <TextField
                                        label="E-mail"
                                        name="email"
                                        type="email"
                                        value={this.state.email}
                                        onChange={(event) => this.handleOnChange('email', event)}
                                    />
                                </FormControl>
                            </FormGroup>
                        </Grid>

                        <Grid item xs={12} sm={12} md={6}>
                            <FormGroup>
                                <FormControl>
                                    <TextField
                                        label="Senha"
                                        name="password"
                                        type="password"
                                        value={this.state.password}
                                        onChange={(event) => this.handleOnChange('password', event)}
                                    />
                                </FormControl>
                                <FormHelperText>Preencha apenas se quiser alterar sua senha</FormHelperText>
                            </FormGroup>
                        </Grid>

                        <Grid item xs={12} sm={12} md={6}>
                            <FormGroup>
                                <FormControl>
                                    <TextField
                                        label="Repita sua senha"
                                        name="password_confirmation"
                                        type="password"
                                        value={this.state.password_confirmation}
                                        onChange={(event) => this.handleOnChange('password_confirmation', event)}
                                    />
                                </FormControl>
                                <FormHelperText>Preencha apenas se quiser alterar sua senha</FormHelperText>
                            </FormGroup>
                        </Grid>

                        <Grid item xs={12} sm={12} md={6}>
                            <FormGroup>
                                <FormControlLabel

                                    control={
                                        <Grid component="label" container spacing={1} alignItems="center">
                                            <Grid item>Não</Grid>
                                            <Grid item>
                                                <Switch
                                                    name="slack_snooze"
                                                    value={[true, false]}
                                                    checked={this.state.slack_snooze ? true : false}
                                                    onChange={(event) => this.handleOnChangeSwitch('slack_snooze', event)}
                                                />
                                            </Grid>
                                            <Grid item>Sim</Grid>
                                        </Grid>
                                    }
                                    label="Ativar o Snooze do Slack?"
                                    labelPlacement="top"
                                />
                            </FormGroup>
                        </Grid>

                        <Grid item xs={12} sm={12} md={6}>
                            <FormGroup>
                                <FormControl>
                                    <TextField
                                        label="Slack Token"
                                        name="slack_token"
                                        value={this.state.slack_token}
                                        onChange={(event) => this.handleOnChange('slack_token', event)}
                                    />
                                </FormControl>
                                <FormHelperText>Para adquirir esse token <Link
                                    href={this.state.linkTokenSlack}
                                    target={"_blank"}>
                                    clique aqui</Link></FormHelperText>
                            </FormGroup>
                        </Grid>

                        <hr/>
                        <Grid item xs={12} sm={12} md={12}>
                            <Typography>Notificações</Typography>
                        </Grid>

                        <Grid item xs={12} sm={12} md={6}>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Grid component="label" container spacing={1} alignItems="center">
                                            <Grid item>Não</Grid>
                                            <Grid item>
                                                <Switch
                                                    name="notification_email"
                                                    checked={this.state.notification_email ? true : false}
                                                    onChange={(event) => this.handleOnChangeSwitch('notification_email', event)}
                                                />
                                            </Grid>
                                            <Grid item>Sim</Grid>
                                        </Grid>
                                    }

                                    label="Receba e-mail com suas tarefas e progressos"
                                    labelPlacement="top"
                                />
                                <FormHelperText>*Função ainda não disponivel, desculpe, estamos trabalhando para implementar isso.</FormHelperText>
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Grid component="label" container spacing={1} alignItems="center">
                                            <Grid item>Não</Grid>
                                            <Grid item>
                                                <Switch
                                                    name="notification_news"
                                                    checked={this.state.notification_news ? true : false}
                                                    onChange={(event) => this.handleOnChangeSwitch('notification_news', event)}
                                                />
                                            </Grid>
                                            <Grid item>Sim</Grid>
                                        </Grid>
                                    }
                                    label="Recebas nossas novas atualizações da plataforma"
                                    labelPlacement="top"
                                />
                                <FormHelperText>*Função ainda não disponivel, assim que os novos recursos estiverem prontos você será notificado.</FormHelperText>
                            </FormGroup>
                        </Grid>

                        <Grid item xs={12} sm={12} md={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >Salvar</Button>
                        </Grid>

                    </Grid>
                </form>
                <ToastContainerCustom/>
            </MasterLayout>
        )
    }
}

export default Configuration