import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import ContactApp from "./List";
import ViewToast from "./Toast";
import { uid } from "uid";
import axios from "axios";
import "./App.css";
import { Form, Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  // modal tambah
  const [showAdd, setShowAdd] = useState(false);

  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);

  // modal detail
  const [showDetail, setShowDetail] = useState(false);

  const handleCloseDetail = () => setShowDetail(false);
  const handleShowDetail = () => setShowDetail(true);

  // modal update
  const [showUpdate, setShowUpdate] = useState(false);

  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = () => setShowUpdate(true);

  const [contacts, setContacts] = useState([]);

  const [isUpdate, setIsUpdate] = useState({ id: null, status: false });

  const [formData, setFormData] = useState({
    Nama: "",
    Email: "",
    Mobile: "",
  });

  useEffect(() => {
    // mengambil data
    axios.get("http://localhost:5000/contacts").then((res) => {
      console.log(res.data);
      setContacts(res?.data ?? []);
    });
  }, []);

  function handleChange(e) {
    let data = { ...formData };
    data[e.target.name] = e.target.value;
    setFormData(data);
  }

  function handleDetail(id) {
    let data = [...contacts];
    let cariData = data.find((contact) => contact.id === id);

    setFormData({
      Nama: cariData.Nama,
      Email: cariData.Email,
      Mobile: cariData.Mobile,
    });

    handleShowDetail();
  }

  function handleSubmit(e) {
    e.preventDefault();
    let data = [...contacts];

    if (formData.Nama === "") {
      return false;
    }

    if (formData.Email === "") {
      return false;
    }

    if (formData.Mobile === "") {
      return false;
    }

    if (isUpdate.status) {
      data.forEach((contact) => {
        if (contact.id === isUpdate.id) {
          contact.Nama = formData.Nama;
          contact.Email = formData.Email;
          contact.Mobile = formData.Mobile;
        }
      });

      axios
        .put(`http://localhost:5000/contacts/${isUpdate.id}`, {
          Nama: formData.Nama,
          Email: formData.Email,
          Mobile: formData.Mobile,
        })
        .then((res) => {});
      handleCloseUpdate();
    } else {
      let newContact = {
        id: uid(),
        Nama: formData.Nama,
        Email: formData.Email,
        Mobile: formData.Mobile,
      };
      data.push(newContact);
      axios
        .post("http://localhost:5000/contacts", newContact)
        .then((res) => {});
      handleCloseAdd();
    }

    setContacts(data);
    setFormData({ Nama: "", Email: "", Mobile: "" });
    setIsUpdate({ id: null, status: false });
  }

  function handleEdit(id) {
    let data = [...contacts];
    let cariData = data.find((contact) => contact.id === id);

    setFormData({
      Nama: cariData.Nama,
      Email: cariData.Email,
      Mobile: cariData.Mobile,
    });
    setIsUpdate({ id: id, status: true });

    handleShowUpdate();
  }

  function handleDelete(id) {
    let data = [...contacts];
    let filterData = data.filter((contact) => contact.id !== id);
    setContacts(filterData);
    axios.delete(`http://localhost:5000/contacts/${id}`).then((res) => {});
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ViewToast />
        <br></br>
        <h3>List Kontak</h3>
        <Button
          style={{ display: "flex", width: "9%" }}
          variant="primary"
          onClick={handleShowAdd}
        >
          Tambah Data
        </Button>
        <Modal show={showAdd} onHide={handleCloseAdd}>
          <Modal.Header closeButton>
            <Modal.Title>Tambah Data</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="Form">
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Nama</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nama"
                    onChange={handleChange}
                    value={formData.Nama}
                    name="Nama"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    onChange={handleChange}
                    value={formData.Email}
                    name="Email"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Mobile"
                    onChange={handleChange}
                    value={formData.Mobile}
                    name="Mobile"
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Simpan
                </Button>
              </Form>
            </div>
          </Modal.Body>
        </Modal>

        <Modal show={showUpdate} onHide={handleCloseUpdate}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="Form">
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Nama</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nama"
                    onChange={handleChange}
                    value={formData.Nama}
                    name="Nama"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    onChange={handleChange}
                    value={formData.Email}
                    name="Email"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Mobile"
                    onChange={handleChange}
                    value={formData.Mobile}
                    name="Mobile"
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Simpan
                </Button>
              </Form>
            </div>
          </Modal.Body>
        </Modal>

        <Modal show={showDetail} onHide={handleCloseDetail}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="Form">
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>{formData.Nama}</Form.Label>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>{formData.Email}</Form.Label>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>{formData.Mobile}</Form.Label>
                </Form.Group>
              </Form>
            </div>
          </Modal.Body>
        </Modal>

        <ContactApp
          handleDetail={handleDetail}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          data={contacts}
        />
      </header>
    </div>
  );
}

export default App;
