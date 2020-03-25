import React, { useReducer } from 'react';
import '../css/App.css';
import { BrowserRouter, Switch } from 'react-router-dom';
import PublicRoute from '../components/PublicRoute'
import Login from './Login.js'
import UserLunchOverView from './UserLunchOverView'

export default class App extends React.Component{
  render(){
    return(
      <BrowserRouter>
        <Switch>
          <PublicRoute restricted={false} component={Login} path="/" exact></PublicRoute>
          <PublicRoute restricted={false} component={UserLunchOverView} path="/dashboard" exact></PublicRoute>
        </Switch>
      </BrowserRouter>
    )
  }
}

