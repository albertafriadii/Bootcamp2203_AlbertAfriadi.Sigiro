const fs = require('fs');

// function untuk load
const loadContact = () => {
    // membaca file
    const file = fs.readFileSync('data/contacts.json','utf8');

    // membaca file JSON
    const contacts = JSON.parse(file);

    return contacts;
}

// function untuk detail data contact
const detailContact = (name) => {
    const contacts = loadContact();
    const detail = contacts.find((contact) => contact.name === name);
    return detail
    // if(!detail){
    //     console.log('Nama tidak ada!');    
    // }
    // console.log(`${detail.name}`);
    // if(contact.email){
    //     console.log(`${detail.email}`);
    // }
    // console.log(`${detail.mobile}`);
}

// membuat export beberapa fungsi ke app.js
module.exports = {loadContact , detailContact};