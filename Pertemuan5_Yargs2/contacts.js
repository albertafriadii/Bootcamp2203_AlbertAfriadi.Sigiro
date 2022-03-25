// inisialisasi file system module
// const fs = require('fs');
// inisialisai readline module
// const readline = require('readline');

// const { require } = require("yargs");

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// membuat fungsi questions agar bisa dipake banyak question
// const questions = (ask) => {
//     return new Promise((resolve, reject) => {
//         rl.question(ask, (inputVariable) => {
//             resolve(inputVariable);
//         });
//     });
// };

// inisialisasi file system module
const fs = require('fs');

// inisialisasi validator
const validator = require('validator');

// function untuk load
const loadContact = () => {
    // membaca file
    const file = fs.readFileSync('data/contacts.json','utf8');

    // membaca file JSON
    const contacts = JSON.parse(file);

    return contacts;
}

// membuat fungsi save contact pada app.js
const saveContact = (name, email, mobile) => {

    const contact = {name, email, mobile};

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

        const contacts = loadContact();

    // validasi jika duplicate nama
    const duplicate = contacts.find((contact) => contact.name === name);
    if (duplicate) {
        console.log('Contact name is already recorded. Use another contact name.');
        return false;
    }

    // validasi email
    // console.log(email);
    if(email){
        if(!validator.isEmail(email)){
            console.log('Invalid email!');
            return false;
        }
    }

    // validasi mobile
    if(!validator.isMobilePhone(mobile,'id-ID')){
        console.log('Invalid mobile!');
        return false;
    }

    // push data ke contacts melalui variable contact
    contacts.push(contact);

    // menginput / write file data ke JSON melalui variable
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));

    // menampilkan console log
    console.log('Terima kasih sudah memasukkan data!');

    // menutup readline
    // rl.close();
}

const listContact = () => {
    const contacts = loadContact();
    console.log('Contact List : ');
    contacts.forEach((contact, i) => {
        console.log(`${i + 1}.${contact.name} - ${contact.mobile}`);
    });
};

// function untuk detail data contact
const detailContact = (name) => {
    const contacts = loadContact();
    const detail = contacts.find((contact) => contact.name === name);
    if(detail){
            console.log(`${detail.name} \n ${detail.email} \n ${detail.mobile}`);
    } else {
        console.log('Nama tidak ada!');    
    }
}

// function untuk delete data contact
const deleteContact = (name) => {
    const contacts = loadContact();
    const deleted = contacts.filter((contact) => contact.name !== name);
    if(contacts.length === deleted.length){
        console.log('Data tidak ada!');
    }

    fs.writeFileSync('data/contacts.json', JSON.stringify(deleted));
    console.log('Data sudah terhapus!');
}

// membuat export beberapa fungsi ke app.js
module.exports = {saveContact, listContact, detailContact, deleteContact};