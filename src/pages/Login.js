import React from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { Link } from 'react-router-dom';
import '../css/Login.css'

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      email: "",
      password: "",
      submitted: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }


  render() {
    const { email, password } = this.state;

    return (
      <div className="login">
        <form name="form" className="loginForm">
          <FormGroup controlId="email" size="lg">
            <FormLabel>Email</FormLabel>
            <FormControl
              autoFocus
              type="email"
              name="email"
              onChange={this.handleChange}
              value={email}
            />
          </FormGroup>
          <FormGroup controlId="password" size="lg">
            <FormLabel>Password</FormLabel>
            <FormControl
              onChange={this.handleChange}
              type="password"
              name="password"
              value={password}
            />
          </FormGroup>
          <Button block size="lg" variant="danger" type="submit">
            Login
          </Button>
          <Link to="/register">No account yet? Register</Link>
        </form>
      </div>
    );
  }
}
