const express = require("express");
const app = express();
const cors = require("cors");
// const bodyParser = require("body-parser");
// const path = require("path");
// const multer = require("multer");
const pool = require("./db");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const { PORT, CLIENT_URL } = require("./constants/index");

//import passport middleware
require("./middlewares/passport-middleware");

// middleware
app.use(cors({ origin: CLIENT_URL, credentials: true }));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, "public")));
// app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// const fileImageStorage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, "./public/images");
//   },
//   filename: (req, file, callback) => {
//     callback(null, Date.now() + "-" + file.originalname);
//   },
// });

// const uploadGambar = multer({
//   storage: fileImageStorage,
// });

// Routes //
const authRoutes = require("./routes/auth");

//initialize routes
app.use("/", authRoutes);

// Add Barang
app.post(
  "/barang", //uploadGambar.single("photo")
  async (req, res) => {
    try {
      const { namabarang, tipebarang, deskripsi, stock } = req.body;
      // const gambar = req.protocol + "://" + req.get("host") + "/uploads/" + req.file.filename;
      const addBarang = await pool.query(
        `INSERT INTO barang(namabarang, tipebarang, deskripsi, stock) VALUES($1, $2, $3, $4) RETURNING *`,
        [namabarang, tipebarang, deskripsi, stock]
      );
      res.json(addBarang.rows);
    } catch (err) {
      console.error(err.message);
    }
  }
);

//Add Barang Masuk
app.post("/barang-masuk", async (req, res) => {
  try {
    const { idbarang, tanggal, penerima, qty, namabarang } = req.body;
    console.log(req.body);
    const addBarangMasuk = await pool.query(
      `INSERT INTO datamasuk(idbarang, tanggal, penerima, qty, namabarang) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [idbarang, tanggal, penerima, qty, namabarang]
    );
    res.json(addBarangMasuk.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Add Barang Keluar
app.post("/barang-keluar", async (req, res) => {
  try {
    const { idbarang, tanggal, penerima, qty, namabarang } = req.body;
    console.log(req.body);
    const addBarangKeluar = await pool.query(
      `INSERT INTO datakeluar(idbarang, tanggal, penerima, qty, namabarang) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [idbarang, tanggal, penerima, qty, namabarang]
    );
    res.json(addBarangKeluar.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// List Barang
app.get("/barang", async (req, res) => {
  try {
    const listBarang = await pool.query(
      "SELECT * FROM barang ORDER BY idbarang"
    );
    res.json(listBarang.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// list barang masuk
app.get("/barang-masuk", async (req, res) => {
  try {
    const listBarangMasuk = await pool.query("SELECT * FROM datamasuk");
    res.json(listBarangMasuk.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// list barang keluar
app.get("/barang-keluar", async (req, res) => {
  try {
    const listBarangKeluar = await pool.query("SELECT * FROM datakeluar");
    res.json(listBarangKeluar.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Detail Barang
app.get("/barang/:idbarang", async (req, res) => {
  try {
    const { idbarang } = req.params;
    const detailBarang = await pool.query(
      "SELECT * FROM barang WHERE idbarang = $1",
      [idbarang]
    );

    res.json(detailBarang.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Update Barang
app.put("/barang/:idbarang", async (req, res) => {
  try {
    const { idbarang } = req.params;
    const { namabarang, tipebarang, deskripsi, stock } = req.body;
    const updateBarang = await pool.query(
      "UPDATE barang SET namabarang = $1, tipebarang = $2, deskripsi = $3, stock = $4 WHERE idbarang = $5",
      [namabarang, tipebarang, deskripsi, stock, idbarang]
    );
    res.json("Barang di update");
  } catch (err) {
    console.error(err.message);
  }
});

// Delete Barang
app.delete("/barang/:idbarang", async (req, res) => {
  try {
    const { idbarang } = req.params;
    await pool.query("DELETE FROM barang WHERE idbarang = $1", [idbarang]);
    res.json("Barang sudah dihapus!");
  } catch (err) {
    console.error(err.message);
  }
});

// List User
app.get("/users", async (req, res) => {
  try {
    const listUsers = await pool.query("SELECT * FROM users");
    res.json(listUsers.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Update User
app.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const { name, email, role } = req.body;
    const updateUsers = await pool.query(
      "UPDATE users SET name = $1, email = $2, role = $3 WHERE id = $4",
      [name, email, role, id]
    );
    res.json("User di update");
  } catch (err) {
    console.error(err.message);
  }
});

// Delete User
app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    await pool.query("DELETE FROM users WHERE id = $1", [id]);
    res.json("User sudah dihapus!");
  } catch (err) {
    console.error(err.message);
  }
});

// Halaman Error
app.use("/", (req, res) => {
  res.status(400);
});

//app start
const appStart = () => {
  try {
    app.listen(PORT, () => {
      console.log(`The app is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

appStart();
