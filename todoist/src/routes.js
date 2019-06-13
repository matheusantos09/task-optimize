import React from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import {isAuthenticated} from "./services/auth"

//Import of pages
import SignUp from './views/SignUp/SignUp'
import Login from './views/Login/Login'
import App from './views/Painel/Painel'
import Solo from './views/Solo/Solo'
import Grupo from './views/Grupo/Grupo'

export const RouteList = {
    login: {
        path: '/',
        name: 'Login'
    },
    signup: {
        path: '/signup',
        name: 'Signup'
    },
    painel: {
        path: '/app',
        name: 'Painel'
    },
    painelSolo: {
        path: '/app/solo',
        name: 'Solo'
    },
    painelGrupo: {
        path: '/app/grupo',
        name: 'Grupo'
    },
}

export const ApiRouteList = {
    login: {
        path: '/auth/login'
    },
    signup: {
        path: '/auth/signup'
    }
}

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
            <Route path='*' component={() => <h1>Página não encontrada</h1>}/>
        </Switch>
    </BrowserRouter>
);

export default Routes;