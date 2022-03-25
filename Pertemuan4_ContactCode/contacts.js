// inisialisasi file system module
const fs = require('fs');
// inisialisai readline module
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// membuat fungsi questions agar bisa dipake banyak question
const questions = (ask) => {
    return new Promise((resolve, reject) => {
        rl.question(ask, (inputVariable) => {
            resolve(inputVariable);
        });
    });
};

// membuat fungsi save contact pada app.js
const saveContact = (name, mobile, email) => {

    const contact = {name, mobile, email};

    // mengecek folder
    const dirPath = './data';
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
            console.log('Folder tidak ditemukan');
        }

    // membuat folder / file jika belum ada
    const dataPath = './data/contacts.json';
        if (!fs.existsSync(dataPath)) {
            fs.writeFileSync(dataPath, '[]', 'utf-8');
        }

    // membaca file
    const file = fs.readFileSync('data/contacts.json','utf8');

    // membuat file JSON
    const contacts = JSON.parse(file);

    // push data ke contacts melalui variable contact
    contacts.push(contact);

    // menginput / write file data ke JSON melalui variable
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));

    // menampilkan console log
    console.log('Terima kasih sudah memasukkan data!');

    // menutup readline
    rl.close();
}

// membuat export beberapa fungsi ke app.js
module.exports = {questions, saveContact};