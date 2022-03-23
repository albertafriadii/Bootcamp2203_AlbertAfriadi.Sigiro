// Variable fs
// const fs = require('fs');
// memasukkan string ke dalam file
// fs.writeFileSync("test.txt", "Hello world");

// membaca file
// fs.readFile("test.txt", "utf-8", (err,data) => {
//     if(err) throw err;
//     console.log(data);
// });

// membuat question
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Siapa nama anda? ', (nama) => {
    rl.question('Berapa nomor handphone anda? ', (nomorHandphone) => {
        rl.question('Apa alamat email anda? ', (email) => {
            console.log(`Halo ${nama}, nomor handphone anda ${nomorHandphone} dan alamat email anda adalah ${email}`);
            rl.close();
        });
    });
});