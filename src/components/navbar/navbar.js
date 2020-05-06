import React from "react";
import { Link } from "react-router-dom";
import { Button, Alert } from "react-bootstrap";
import { PersonFill } from "react-bootstrap-icons"
import "./navbar.css";

 

class Navbar extends React.Component {
    render() {
        return (
            <div class="navigationpanel">
                    <h1>Welkom {window.sessionStorage.getItem("name")}</h1>
                <nav>
                    <Link to="/dashboard"><Button variant="success" block>Maand</Button></Link>
                    <Link to="/add"><Button variant="success" block>Week</Button></Link>        
                    <Link to="/lunch"><Button variant="success" block>Overzicht lunch</Button></Link>
                    {window.sessionStorage.getItem("role") === "ADMIN" && (
                        <div>
                            <Link to="/secaddlunch"><Button variant="success" block>Nieuwe lunch</Button></Link>
              <Link to="/employees"><Button variant="success" block>Medewerker details</Button></Link>
                            <Link to="/seccreateuser"><Button variant="success" block>Nieuw account</Button></Link>
                        </div>
                    )}
                    <Link to="/logout"><Button variant="info" block>Uitloggen</Button></Link>
                </nav>
            </div>
        );
    }
}

 

export default Navbar;