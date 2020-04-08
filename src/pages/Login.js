import React, { Component } from 'react'
import auth from '../service/auth'
import { Container, Row, Col, Button } from 'react-bootstrap'

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: ''
    }
  }

  handleEmailChange = event => {
    this.setState({
      email: event.target.value
    })
  }

  handlePasswordChange = event => {
    this.setState({
      password: event.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    fetch('https://lunchtag-resource-server.herokuapp.com/auth/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      })
    }).then(response => response.json())
      .then(data => {
    
        if (data.token != null) {
          console.log('Gebruiker is ingelogd heeft een valide token');
          auth.login(data)
          window.alert("Succesvol ingelogd")
          console.log(data)
          //this.props.history.push('')

        }
        else{
          console.log("Inloggen mislukt")
        }

      });
  }

  render() {
    return (
      <Container>
        <Row><Col><h3>Inloggen:</h3></Col></Row>
        <Row><Col>
            <label>Emailadres:</label>
            <input required type="text" className="form-control" placeholder="Vul hier uw emailadres in" onChange={this.handleEmailChange} />
          </Col></Row>
        <Row><Col>
          <label>Wachtwoord:</label>
          <input required type="password" className="form-control" placeholder="Vul uw wachtwoord in" onChange={this.handlePasswordChange} />
        </Col></Row>
        <Row><Button size="lg" block onClick={this.handleSubmit}>Bevestig</Button></Row>
      </Container>
    );
  }
}

export default Login