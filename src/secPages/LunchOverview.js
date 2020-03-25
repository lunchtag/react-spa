import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'

import LunchItem from '../components/LunchItem'

class LunchOverview extends Component {
    
    constructor(props){
        super(props)

        this.state = {
            userId: '',
            lunches: []
        }

        this.getLunches()
    }

    getLunches(){
        fetch('api/url')
        .then(res => res.json()).catch()
        .then((data) => {
            this.setState({ lunches: data})
        })
    }


render(){
    const { userId, lunches } = this.state;

    return (
        <React.Fragment>
            <div>
                <h1>Overzicht lunch</h1> 
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Naam</th>
                            <th>Datum</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {lunches.map((item) => (
                            <LunchItem key={item.id} lunch={item}/>
                        ))}
                    </tbody>
                </Table>
            </div>

        </React.Fragment >
    )

}

}

export default LunchOverview