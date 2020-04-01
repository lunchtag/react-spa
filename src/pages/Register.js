import React, { Component } from 'react'

class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: ''
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

    handleFirstNameChange = event => {
        this.setState({
            firstName: event.target.value
        })
    }

    handleLastNameChange = event => {
        this.setState({
            lastName: event.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        fetch('https:lunchtag-auth.herokuapp.com/auth/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               email: this.state.email,
               password: this.state.password,
               firstName: this.state.firstName,
               lastName: this.state.lastName
            })
        }).then(response => response.json())
            .then(data => {
                console.log(data)
                if(data.token != null){
                    window.alert("De gebruiker is succesvol aangemaakt!")
                }
            });
    }

    render() {
        return (
                <div className="div">
                    <h3>Registreer</h3>
                    <div className="form-group">
                        <label>Email:</label>
                        <input required type="text" className="form-control" placeholder="Vul uw email adres in" onChange={this.handleEmailChange} />
                    </div>
                    <div className="form-group">
                        <label>Wachtwoord:</label>
                        <input required type="password" className="form-control" placeholder="Vul uw wachtwoord in" onChange={this.handlePasswordChange} />
                    </div>
                    <div className="form-group">
                        <label>Voornaam:</label>
                        <input required type="text" className="form-control" placeholder="Vul uw voornaam in" onChange={this.handleFirstNameChange} />
                    </div>
                    <div className="form-group">
                        <label>Achternaam:</label>
                        <input required type="text" className="form-control" placeholder="Vul uw achternaam in" onChange={this.handleLastNameChange} />
                    </div>
                    <button className="btn btn-primary btn-block" onClick={this.handleSubmit}>Bevestig</button>
                </div>
        );
    }
}

export default Register