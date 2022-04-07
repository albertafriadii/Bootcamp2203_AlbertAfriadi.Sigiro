const fs = require('fs');

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


// function untuk load
const loadContact = () => {
    // membaca file
    const file = fs.readFileSync('data/contacts.json','utf8');

    // membaca file JSON
    const contacts = JSON.parse(file);

    return contacts;
}

// function untuk tambah data contact
const saveContact = (contact) => {
    fs.writeFileSync('data/contacts.json', JSON.stringify(contact));
}

const addContact = (contact) => {
    const contacts = loadContact()
    contacts.push(contact)
    saveContact(contacts)
}

// function untuk detail data contact
const detailContact = (name) => {
    const contacts = loadContact();
    const detail = contacts.find((contact) => contact.name === name);
    return detail
}

const duplicate = (name) => {
    const contacts = loadContact();
    return contacts.find((contact) => contact.name === name)
}

// membuat export beberapa fungsi ke app.js
module.exports = {loadContact , detailContact, saveContact, addContact, duplicate};