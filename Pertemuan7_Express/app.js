const express = require('express')  //module express
const url = require('url')      // module url
const app = express()           // menjadikan module express jadi function
const port = 3000               // port untuk server


app.get('/', (req, res) => {    // routing page
    res.sendFile('./index.html', {root: __dirname})      // response untuk dikembalikan ke client
})

app.get('/about', (req, res) => {   // routing page
    res.sendFile('./about.html', {root: __dirname})   // response untuk dikembalikan ke client
})

app.get('/contact', (req, res) => {     // routing page
    res.sendFile('./contact.html', {root: __dirname})     // response untuk dikembalikan ke client
})

app.get('/product/:productId/category/:categoryId', (req, res) => {     // memanggil dengan id
    res.send('product id : ' + req.params.productId + '<br> category id : ' + req.params.categoryId) // response untuk dikembalikan ke client
})

app.get('/product/:id', (req, res) => {     //memanggil dengan id dan query
    res.send('Product id : ' + req.params.id + '<br> Category id : ' + req.query.category)  //// response untuk dikembalikan ke client
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