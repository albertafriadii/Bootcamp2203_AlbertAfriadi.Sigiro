const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const port = 3001;

// middleware
app.use(cors());
app.use(express.json());

// Routes //
// Add Contact
app.post("/contacts", async (req, res) => {
  try {
    const { nama, email, mobile } = req.body;
    const addContact = await pool.query(
      "INSERT INTO kontak (nama, email, mobile) VALUES ($1,$2,$3) RETURNING *",
      [nama, email, mobile]
    );
    res.json(addContact.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// List Contact
app.get("/contacts", async (req, res) => {
  try {
    const listContact = await pool.query("SELECT * FROM kontak");
    res.json(listContact.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Detail Contact
app.get("/contacts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const detailContact = await pool.query(
      "SELECT * FROM kontak WHERE id = $1",
      [id]
    );

    res.json(detailContact.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Update Contact
app.put("/contacts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, email, mobile } = req.body;
    const updateContact = await pool.query(
      "UPDATE kontak SET nama = $1, email = $2, mobile = $3 WHERE id = $4",
      [nama, email, mobile, id]
    );
    res.json("Kontak di update");
  } catch (err) {
    console.error(err.message);
  }
});

// Delete Contact
app.delete("/contacts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM kontak WHERE id = $1", [id]);
    res.json("Kontak sudah dihapus!");
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
