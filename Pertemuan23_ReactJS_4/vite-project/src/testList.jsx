import React from 'react';
import Contact from './contact'
import { Card } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ContactApp(){
    const listData = Contact.map((item) => {
        return (
        <Card style={{ width: '18rem' , float: 'left', margin: '1rem', color: 'black'}}>
            <Card.Body>
                <Card.Title>{item.Nama}</Card.Title>
                <Card.Text>
                    {item.Email}
                    <br></br>
                    {item.Mobile}
                </Card.Text>
            </Card.Body>
        </Card>
        )
    })

    return(
        <div>
            {listData} 
        </div>
    )
}