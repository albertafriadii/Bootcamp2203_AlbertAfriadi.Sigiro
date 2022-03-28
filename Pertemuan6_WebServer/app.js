const http = require('http');
const read = require('./read.js');

// membuat server
http
    .createServer((req,res) => {
        const url = req.url;
        console.log(url);
        // membuat head dengan content type
        res.writeHead(200, {
            'Content-Type' : 'text/html'
        });

        //cek menurut url yang dimasukkan 
        if (url === '/about') {
            read.readHtml('./about.html', res);
        } else if (url === '/contact') {
            read.readHtml('./contact.html', res);
        } else {
            read.readHtml('./index.html', res);
        }
    })
    .listen(3000,() => { //port untuk listening server
    console.log('Server is listening on port 3000');
})