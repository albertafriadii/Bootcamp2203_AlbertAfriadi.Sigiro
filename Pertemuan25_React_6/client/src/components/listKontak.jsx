import React, { Fragment, useEffect, useState } from "react";
import UpdateContact from "./updateKontak";
import DetailContact from "./detailKontak";
import { Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ListKontak() {
  const [contacts, setContacts] = useState([]);

  const getContact = async () => {
    try {
      const response = await fetch("http://localhost:3001/contacts");
      const jsonData = await response.json();
      setContacts(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleDelete = async (id) => {
    console.log(id);
    try {
      await fetch(`http://localhost:3001/contacts/${id}`, {
        method: "DELETE",
      });
      const filterData = contacts.filter((contact) => contact.id !== id);
      setContacts(filterData);
      console.log(setContacts(filterData));
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getContact();
  }, []);

  const contactData = contacts.map((contact) => {
    return (
      <Fragment key={contact.id}>
        <Card
          style={{
            width: "18rem",
            float: "left",
            margin: "1rem",
            color: "black",
            display: "flex",
            overflow: "x",
          }}
        >
          <Card.Body>
            <Card.Title>Data Kontak</Card.Title>
            <Card.Text>
              {contact.nama}
              <br></br>
              {contact.email}
              <br></br>
              {contact.mobile}
            </Card.Text>
            <DetailContact contacts={contact} setContacts={setContacts} />
            <UpdateContact contacts={contact} />
            <Button
              style={{ width: "80%" }}
              variant="danger"
              onClick={() => handleDelete(contact.id)}
            >
              Hapus Data
            </Button>
          </Card.Body>
        </Card>
      </Fragment>
    );
  });

  return <div>{contactData}</div>;
}
