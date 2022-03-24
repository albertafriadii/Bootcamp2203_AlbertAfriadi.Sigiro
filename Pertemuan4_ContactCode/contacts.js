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
    const dirPath = './data';
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
        }
    const dataPath = './data/contacts.json';
        if (!fs.existsSync(dataPath)) {
            fs.writeFileSync(dataPath, '[]', 'utf-8');
        }
    const file = fs.readFileSync('data/contacts.json','utf8');
    const contacts = JSON.parse(file);
    contacts.push(contact);
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
    console.log('Terima kasih sudah memasukkan data!');
    rl.close();
}

// membuat export beberapa fungsi ke app.js
module.exports = {questions, saveContact};