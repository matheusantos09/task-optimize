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
import Notification from './views/Notification/Notification'
import Tasks from './views/Tasks/Tasks'

const AppNameRoute = '/app'
const AuthRoutesPrefix = '/auth'

export const RouteList = {
    login: {
        path: '/',
        name: 'Login'
    },
    logout: {
        path: '/logout',
        name: 'Logout',
        icon: 'logout',
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
        icon: 'solo',
    },
    notifications: {
        path: AppNameRoute + '/notifications',
        name: 'Notificações',
        icon: 'notification',
    },
    tasks: {
        path: AppNameRoute + '/tasks',
        name: 'Tarefas',
        icon: 'tasks',
    },
    painelGrupo: {
        path: AppNameRoute + '/grupo',
        name: 'Grupo',
        icon: 'group',
    },
    configuration: {
        path: AppNameRoute + '/user',
        name: 'Configurações',
        icon: 'configuration',
    },
}

export const ApiRouteList = {
    login: AuthRoutesPrefix + '/login',
    signup: AuthRoutesPrefix + '/signup',
    tasks: AuthRoutesPrefix + '/task',
    tasksList: AuthRoutesPrefix + '/task-list',
    completedTasks: AuthRoutesPrefix + '/task/completed',
    saveTask: AuthRoutesPrefix + '/task/save',
    taskDestroy: AuthRoutesPrefix + '/task/destroy',
    changeStatus: AuthRoutesPrefix + '/change-task',
    taskUpdate: AuthRoutesPrefix + '/task/edit/',
    eventTimer: AuthRoutesPrefix + '/timer-event',
    saveConfigUser: AuthRoutesPrefix + '/user/save',
    loadConfigUser: AuthRoutesPrefix + '/user/load',
    startSnooze: AuthRoutesPrefix + '/user/snooze/start',
    endSnooze: AuthRoutesPrefix + '/user/snooze/end',
    randomPhase: AuthRoutesPrefix + '/phase/random',
    userUploadImage: AuthRoutesPrefix + '/user/upload',
    notificationIndex: AuthRoutesPrefix + '/notification'
}

export const MenuSolo = [
    {
        path: RouteList.configuration.path,
        name: RouteList.configuration.name,
        icon: RouteList.configuration.icon,
    },
    {
        path: RouteList.tasks.path,
        name: RouteList.tasks.name,
        icon: RouteList.tasks.icon,
    },
    {
        path: RouteList.notifications.path,
        name: RouteList.notifications.name,
        icon: RouteList.notifications.icon,
    },
    {
        path: RouteList.painelSolo.path,
        name: RouteList.painelSolo.name,
        icon: RouteList.painelSolo.icon,
    },
    {
        path: RouteList.painelGrupo.path,
        name: RouteList.painelGrupo.name,
        icon: RouteList.painelGrupo.icon,
    },
    {
        path: RouteList.logout.path,
        name: RouteList.logout.name,
        icon: RouteList.logout.icon,
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
            <PrivateRoute exact path={RouteList.notifications.path} component={Notification}/>
            <PrivateRoute exact path={RouteList.tasks.path} component={Tasks}/>
            <PrivateRoute exact path={RouteList.logout.path} component={Logout}/>
            <Route path='*' component={NotFound}/>
        </Switch>
    </BrowserRouter>
);

export default Routes;