import React from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import {isAuthenticated} from "./services/auth"

//Import of pages
import SignUp from './components/pages/SignUp/SignUp'
import Login from './components/pages/Login/Login'
import App from './components/pages/Painel/App'
import Solo from './components/pages/Solo/Solo'
import Grupo from './components/pages/Grupo/Grupo'

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
            <Route exact path='/' component={Login} />
            <Route exact path='/signup' component={SignUp} />
            <PrivateRoute exact path='/app' component={App} />
            <PrivateRoute exact path='/app/solo' component={Solo} />
            <PrivateRoute exact path='/app/Grupo' component={Grupo} />
            <Route path='*' component={() => <h1>Página não encontrada</h1>} />
        </Switch>
    </BrowserRouter>
);

export default Routes;