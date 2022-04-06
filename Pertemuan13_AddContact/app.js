const express = require('express')  //module express
const expressLayouts = require('express-ejs-layouts')
const app = express()           // menjadikan module express jadi function
const port = 3000               // port untuk server
const path = require('path')    // module path
const morgan = require('morgan') // module morgan
const contacts = require('./views/contacts'); // call contacts.js

app.use(morgan('dev'))

// informasi menggunakan ejs
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// templating engine
app.use(expressLayouts)
app.use('/public',express.static(path.join(__dirname, 'public')))
app.set('layout', './layouts/full-width')


// menampilkan waktu dari 1 januari 1970 sampai sekarang
app.use((req, res, next) => {
    console.log('Time:', Date.now())
    next()
  })

app.get('/', (req, res) => {    // routing page

    const author = "Albert Afriadi Sigiro"

    res.locals.title = "Home"       // menampilkan title
    res.render('index', {
        author: author,
    })      // response untuk dikembalikan ke client
})

app.get('/detail/:name', (req, res) => {
    
    // memanggil fungsi detail kontak berdasarkan nama
    const det = contacts.detailContact(req.params.name)

    res.locals.title = "Detail Contact"
    res.render('detail', {
        det,
    })
})

app.get('/about', (req, res) => {   // routing page
    res.locals.title = "About"      // menampilkan title
    res.render('about')   // response untuk dikembalikan ke client
})

app.get('/contact', (req, res) => {     // routing page
    
    // mengambil data json
    const cont = contacts.loadContact()

    res.locals.title = "Contact"        // menampilkan title
    res.render('contact', {
        cont,
    })     // response untuk dikembalikan ke client
})

app.get('/addContact', (req, res) => {
    res.locals.title = 'Tambah Data'
    res.render('addContact')
})

app.post('/contact', (req, res) => {
    contacts.saveContact(req.body)
    res.redirect('/contact')
})

app.use('/', (req, res) => {    // routing page
    res.status(404)             // menentukan status page
    res.send('Page not found')  // response untuk dikembalikan ke client
})

app.listen(port, () => {        // server pada port yang ditentukan
  console.log(`Example app listening on port ${port}`)  // menampilkan ke client melalui console
})












// const http = require('http');
// const read = require('./read.js');

// // membuat server
// http
//     .createServer((req,res) => {
//         const url = req.url;
//         console.log(url);
//         // membuat head dengan content type
//         res.writeHead(200, {
//             'Content-Type' : 'text/html'
//         });

//         //cek menurut url yang dimasukkan 
//         if (url === '/about') {
//             read.readHtml('./about.html', res);
//         } else if (url === '/contact') {
//             read.readHtml('./contact.html', res);
//         } else {
//             read.readHtml('./index.html', res);
//         }
//     })
//     .listen(3000,() => { //port untuk listening server
//     console.log('Server is listening on port 3000');
// })