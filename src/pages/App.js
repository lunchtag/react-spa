import React from 'react';
import '../css/App.css';
import { BrowserRouter, Switch } from 'react-router-dom';
import PublicRoute from '../components/PublicRoute'
import Login from './Login.js'
import Register from './Register'
import LunchOverview from '../secPages/LunchOverview'


export default class App extends React.Component{
  render(){
    return(
      <BrowserRouter>
        <Switch>
          <PublicRoute restricted={false} component={Login} path="/" exact></PublicRoute>
          <PublicRoute path="/lunch" component={LunchOverview}></PublicRoute>
          <PublicRoute path="/register" component={Register}></PublicRoute>
        </Switch>
      </BrowserRouter>
    )
  }
}

