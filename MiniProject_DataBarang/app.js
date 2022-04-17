const express = require('express') //module express
const expressLayouts = require('express-ejs-layouts') //module express layouts
const path = require('path')    // module path

const app = express() // memanggil fungsi express
const port = 3000 // port untuk server
const { pool } = require('./config/dbConfig') // menghubungkan ke database
const bcrypt = require('bcrypt') // hash password
const session = require('express-session') // module session
const flash = require('express-flash') // module flash
const passport = require('passport') // module passport
const { check, validationResult } = require('express-validator') // module express-validator
require('dotenv').config()   // module dotenv
const logger = require('./logger')

const initializePassport = require('./config/passportConfig')

initializePassport(passport)

// Setup EJS
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(expressLayouts)
app.use('/public',express.static(path.join(__dirname, 'public')))
app.set('layout', './layouts/full-width')
app.use(express.urlencoded({extended: true}))

// Setup session
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}))

// Setup passport
app.use(passport.initialize())
app.use(passport.session())

// Setup flash
app.use(flash())

// halaman index
app.get('/', (req, res) => {
    res.render('index',{
        title: "Home"
    })    
    logger.info('Mengakses halaman home')
})

// halaman login
app.get('/login', checkAuthenticated, (req, res) => {
    res.render('login', {
        title: "Login",
    })
    logger.info('Mengakses halaman login') 
})

app.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
}))

// halaman register
app.get('/register', checkNotAuthenticated, (req,res) => {
    res.render('register', {
        title: "Register",
    })
    logger.info('Mengakses halaman register')
})

app.post('/register',[
    check('email', 'Format email yang dimasukkan salah!').isEmail()
], async(req,res) => {
    const { name, email, password, password2, role} = req.body
    const errors = []
    const error = validationResult(req)

    if(!error.isEmpty()){            
        res.render('register', {
            errors,
            title: "Register",
        })
    }
    
    console.log({
        name,
        email,
        password,
        password2,
    })
    
    if(!name || !email || !password || !password2 || !role){
        errors.push({message: "Isi semua data, jangan kosong"})
        logger.error('Mengisi form register dengan field kosong')
    }

    if(password.length < 8){
        errors.push({message: "Password minimal 8 karakter"})
        logger.error('Mengisi form password register kurang dari 8 karakter')
    }

    if(password != password2){
        errors.push({message: "Password tidak sama"})
        logger.error('Mengisi form password dan confirm password register tidak sama')
    }

    if(errors.length > 0){
        res.render('register', {
            errors,
            title: "Register",
        })

    } else {
        const hashPassword = await bcrypt.hash(password, 10)
        console.log(hashPassword)

        pool.query(`SELECT * FROM users WHERE email = $1`, [email], (err, results) => {
            if(err){
                throw err
            }
            console.log(results.rows)

            if(results.rows.length > 0){
                return res.render('register', {
                    errors,
                    title: "Register",
                    message: "Email sudah dipakai"
                })
            } else {
                pool.query(`INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, password`, [name, email, hashPassword, role], (err, results) => {
                    if(err){
                        throw err
                    }
                    console.log(results.rows)
                    res.redirect('/dashboard')
                    logger.info('Membuat user baru')
                    }
                )
            }
        }
        )
    }
})

// halaman dashboard
app.get('/dashboard', checkNotAuthenticated, async(req,res) => {
    res.render('dashboard', {
        title: "Dashboard",
        user: req.user.name,
        role : req.user.role
    })
    logger.info('Mengakses halaman dashboard')
})

// halaman about
app.get('/about', checkNotAuthenticated, async(req, res) => {
    res.render('about', {
        title: "About",
        user: req.user.name,
        role : req.user.role
    })
    logger.info('Mengakses halaman about us')
})

// halaman barang
app.get('/barang', checkNotAuthenticated, async(req,res) => {
    const role = req.user.role
    if((role == "admin") || (role == "superadmin")) {
        try{
            const listBarang = await pool.query('SELECT * FROM barang')
            // res.json(listbarang.rows)
            res.render('barang', {
                title: "Barang",
                barang: listBarang.rows,
                listBarang,
                role,
            })
            logger.info('Mengakses halaman data barang')
        } catch (err){
            console.error(err.message)
        }
    } else {
        logger.warn('Tidak Punya Akses!')
        res.redirect('/dashboard')
    }
})

// halaman users
app.get('/users', checkNotAuthenticated, async(req,res) => {
    const role = req.user.role
    if((role == "admin") || (role == "superadmin")) {
        try{
            const listUsers = await pool.query('SELECT * FROM users')
            // res.json(listbarang.rows)
            res.render('users', {
                title: "users",
                users: listUsers.rows,
                listUsers,
                role,
            })
            logger.info('Mengakses halaman data Users')
        } catch (err){
            console.error(err.message)
        }
    } else {
        logger.warn('Tidak Punya Akses!')
        res.redirect('/dashboard')
    }
})

// tambah barang
app.get('/addBarang', checkNotAuthenticated, async(req,res) => {
    const role = req.user.role
    if((role == "admin") || (role == "superadmin")) {
        res.render('addBarang', {
            title: "Tambah Barang",
        })
        logger.info('Mengakses halaman tambah barang')
    } else {
        logger.warn('Tidak Punya Akses!')
        res.redirect('/dashboard')
    }
})

app.post('/barang', async(req,res) => {
    const errors = []
    if(errors.length > 0){
        res.render('addBarang', {
            title: "Tambah Barang",
            errors,
        })
    } else{
        const {namabarang, tipebarang, deskripsi, stock} = req.body
        console.log(req.body)
        await pool.query(`INSERT INTO barang(namabarang, tipebarang, deskripsi, stock) VALUES($1, $2, $3, $4) RETURNING *`, [namabarang, tipebarang, deskripsi,stock])
        res.redirect('/barang')
        logger.info('Menambah data')
    }
})

// detail barang
app.get('/detailBarang/:idbarang', checkNotAuthenticated, async(req,res) => {
    const role = req.user.role
    if((role == "admin") || (role == "superadmin")) {
        try{
            const idbarang = req.params.idbarang
            const {rows: detailBarang} = await pool.query(`SELECT * FROM barang WHERE idbarang = $1`, [idbarang])
            detailBarang.map(barang => {
                res.render('detailBarang', {
                    title: "Detail barang",
                    detailBarang,
                    barang,
                })
                logger.info('Mengakses halaman detail barang')
            })
            logger.info('Melihat detail data')
        } catch (err){
            console.error(err.message)
        }
    } else{
        logger.warn('Tidak Punya Akses!')
        res.redirect('/dashboard')
    }
})

// delete barang
app.get('/barang/delete/:idbarang', checkNotAuthenticated, async(req,res) => {
    const role = req.user.role
    if((role == "admin") || (role == "superadmin")) {
        try {
            const idbarang = req.params.idbarang
            await pool.query(`DELETE FROM barang WHERE idbarang = $1`, [idbarang])
            res.redirect('/barang')
            logger.info('Menghapus data barang')
        } catch (err) {
            console.error(err.message)
        }
    } else {
        logger.warn('Tidak Punya Akses!')
        res.redirect('/dashboard')
    }
})

// delete users
app.get('/users/delete/:id', checkNotAuthenticated, async(req,res) => {
    const role = req.user.role
    if((role == "admin") || (role == "superadmin")) {
        try {
            const id = req.params.id
            await pool.query(`DELETE FROM users WHERE id = $1`, [id])
            res.redirect('/users')
            logger.info('Menghapus data users')
        } catch (err) {
            console.error(err.message)
        }
    } else {
        logger.warn('Tidak Punya Akses!')
        res.redirect('/dashboard')
    }
})

// update barang
app.get('/barang/update/:idbarang', checkNotAuthenticated, async(req,res) => {
    const role = req.user.role
    if((role == "admin") || (role == "superadmin")) {
        try{
            const idbarang = req.params.idbarang
            const {rows: detailBarang} = await pool.query(`SELECT * FROM barang WHERE idbarang = $1`, [idbarang])
            detailBarang.map(barang => {
                res.render('updateBarang', {
                    title: "Update Barang",
                    detailBarang,
                    barang,
                })
                logger.info('Mengakses halaman update barang')
            })
        } catch (err){
            console.error(err.message)
        }
    } else {
        logger.warn('Tidak Punya Akses!')
        res.redirect('/dashboard')
    }
})

app.post('/barang/update', async(req,res) => {
    try{
        const errors = []
        if(errors.length > 0){
            res.render('updateBarang', {
                title: "Update Barang",
                errors,
                barang: req.body,
            })
        } else {
            const {namabarang, tipebarang, deskripsi, stock} = req.body
            console.log(req.body)
            await pool.query(`UPDATE barang 
            SET namabarang = $1, tipebarang = $2, deskripsi = $3, stock = $4 
            WHERE namabarang = '${req.body.oldName}'`, [namabarang, tipebarang, deskripsi, stock])
            res.redirect('/barang')
        }
    } catch(err) {
        console.error(err.message)
    }
})

// update users
app.get('/users/update/:id', checkNotAuthenticated, async(req,res) => {
    const role = req.user.role
    if((role == "admin") || (role == "superadmin")) {
        try{
            const id = req.params.id
            const {rows: detailUsers} = await pool.query(`SELECT * FROM users WHERE id = $1`, [id])
            detailUsers.map(users => {
                res.render('updateUsers', {
                    title: "Update Users",
                    detailUsers,
                    users,
                })
                logger.info('Mengakses halaman update users')
            })
        } catch (err){
            console.error(err.message)
        }
    } else {
        logger.warn('Tidak Punya Akses!')
        res.redirect('/dashboard')
    }
})

app.post('/users/update', [
    check('email', 'Format email yang dimasukkan salah!').isEmail()
], async(req,res) => {
    try{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            res.render('updateUsers', {
                title: "Update Users",
                errors,
                users: req.body,
            })
        } else {
            const {name, email, role} = req.body
            console.log(req.body)
            await pool.query(`UPDATE users 
            SET name = $1, email = $2, role = $3
            WHERE name = '${req.body.oldName}'`, [name, email, role])
            res.redirect('/users')
        }
    } catch(err) {
        console.error(err.message)
    }
})

// logout
app.get('/logout', (req,res) => {
    req.logOut(),
    logger.info("Logout")
    res.redirect('/')
})

function checkAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return res.redirect('dashboard')
    }
    next()
}

function checkNotAuthenticated(req, res, next){
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}

app.use('/', (req, res) => {
    res.status(400)
    res.render('404', {
        title: "404||ERROR",
    })
})

// listening port / port yang digunakan sebagai server
app.listen(port, () => {
    logger.info(`App listening on port http://localhost:${port}`)
})