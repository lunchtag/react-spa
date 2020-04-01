import React from 'react';
import '../css/App.css';
import { BrowserRouter, Switch } from 'react-router-dom';
import PublicRoute from '../components/PublicRoute'
import Login from './Login.js'
import LunchOverview from '../secPages/LunchOverview'
import Navbar from '../components/navbar/navbar.js'

export default class App extends React.Component{
  render(){
    return(
      <BrowserRouter>
        <Switch>
          <PublicRoute restricted={false} component={Login} path="/" exact></PublicRoute>
          <PublicRoute path="/nav" component={Navbar}></PublicRoute>
          <PublicRoute path="/lunch" component={LunchOverview}></PublicRoute>
        </Switch>
      </BrowserRouter>
    )
  }
}

