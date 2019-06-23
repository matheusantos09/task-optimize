import React from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import {isAuthenticated} from "./services/auth"

//Import of pages
import SignUp from './views/SignUp/SignUp'
import Login from './views/Login/Login'
import App from './views/Painel/Painel'
import Solo from './views/Solo/Solo'
import Grupo from './views/Grupo/Grupo'
import Configuration from './views/User/Configuration'
import NotFound from './views/NotFound/NotFound'
import Logout from './views/Logout/Logout'

const AppNameRoute = '/app';

export const RouteList = {
    login: {
        path: '/',
        name: 'Login'
    },
    logout: {
        path: '/logout',
        name: 'Logout'
    },
    signup: {
        path: '/signup',
        name: 'Signup'
    },
    painel: {
        path: AppNameRoute + '',
        name: 'Painel'
    },
    painelSolo: {
        path: AppNameRoute + '/solo',
        name: 'Solo',
    },
    notifications: {
        path: AppNameRoute + '/solo/notifications',
        name: 'Notificações'
    },
    painelGrupo: {
        path: AppNameRoute + '/grupo',
        name: 'Grupo'
    },
    configuration: {
        path: AppNameRoute + '/user',
        name: 'Configurações'
    },
}

export const ApiRouteList = {
    login: '/auth/login',
    signup: '/auth/signup',
    tasks: '/auth/task',
    completedTasks: '/auth/task/completed',
    saveTask: '/auth/task/save',
    taskDestroy: '/auth/task/destroy',
    changeStatus: '/auth/change-task',
    taskUpdate: '/auth/task/edit/',
    eventTimer: '/auth/timer-event',
    saveConfigUser: '/auth/user/save',
    loadConfigUser: '/auth/user/load',
    startSnooze: '/auth/user/snooze/start',
    endSnooze: '/auth/user/snooze/end',
    randomPhase: '/auth/phase/random',
    userUploadImage: '/auth/user/upload'
}

export const MenuSolo = [
    {
        path: AppNameRoute + '/user',
        name: 'Minha Conta',
        icon: 'configuration',
    },
    {
        path: AppNameRoute + '/solo/notifications',
        name: 'Notificações',
        icon: 'notification',
    },
    {
        path: AppNameRoute + '/solo',
        name: 'Solo',
        icon: 'solo',
    },
    {
        path: AppNameRoute + '/grupo',
        name: 'Grupo',
        icon: 'group',
    },
    {
        path: '/logout',
        name: 'Logout',
        icon: 'logout',
    },
]


const PrivateRoute = ({component: Component, ...rest}) => (
    <Route
        {...rest}
        render={props => isAuthenticated() ?
            (
                <Component {...props}/>
            ) : (
                <Redirect to={{pathname: '/', state: {from: props.location}}}/>
            )
        }
    />
);

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path={RouteList.login.path} component={Login}/>
            <Route exact path={RouteList.signup.path} component={SignUp}/>
            <PrivateRoute exact path={RouteList.painel.path} component={App}/>
            <PrivateRoute exact path={RouteList.painelSolo.path} component={Solo}/>
            <PrivateRoute exact path={RouteList.painelGrupo.path} component={Grupo}/>
            <PrivateRoute exact path={RouteList.configuration.path} component={Configuration}/>
            <PrivateRoute exact path={RouteList.logout.path} component={Logout}/>
            <Route path='*' component={NotFound}/>
        </Switch>
    </BrowserRouter>
);

export default Routes;