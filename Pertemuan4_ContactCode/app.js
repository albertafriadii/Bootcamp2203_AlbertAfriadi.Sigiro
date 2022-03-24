// const fs = require('fs');
// const readline = require('readline');

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// // membuat function untuk call question

// const questions = (ask) => {
//     return new Promise((resolve, reject) => {
//         rl.question(ask, (inputVariable) => {
//             resolve(inputVariable);
//         });
//     });
// };

// // memanggil function call question

// const main = async () => {
//     const name = await questions('What is your name? ');
//     const mobile = await questions('Your number mobile? ');
//     const email = await questions('Your Email? ');

//     const contact = {name, mobile, email};
//     const dirPath = './data';
//         if (!fs.existsSync(dirPath)) {
//             fs.mkdirSync(dirPath);
//         }
//     const dataPath = './data/contacts.json';
//         if (!fs.existsSync(dataPath)) {
//             fs.writeFileSync(dataPath, '[]', 'utf-8');
//         }
//     const file = fs.readFileSync('data/contacts.json','utf8');
//     const contacts = JSON.parse(file);
//     contacts.push(contact);
//     fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
//     console.log('Terima kasih sudah memasukkan data!');
//     rl.close();
// };

// // menampilkan function
// main();

// // rl.question('What is your name? ', (name) => {
// //     rl.question('Your number mobile? ', (mobile) => {
// //         const contact = {name, mobile};
// //         const dirPath = './data';
// //             if (!fs.existsSync(dirPath)) {
// //                 fs.mkdirSync(dirPath);
// //             }
// //         const dataPath = './data/contacts.json';
// //             if (!fs.existsSync(dataPath)) {
// //                 fs.writeFileSync(dataPath, '[]', 'utf-8');
// //             }
// //         const file = fs.readFileSync('data/contacts.json','utf8');
// //         const contacts = JSON.parse(file);
// //         contacts.push(contact);
// //         fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
// //         console.log('Terima kasih sudah memasukkan data!');
// //         rl.close();
// //     });
// // });

// inisialisasi contact.js
const contacts = require('./contacts');

const main = async () => {
    const name = await contacts.questions('What is your name? ');
    const email = await contacts.questions('Your email address? ');
    const mobile = await contacts.questions('Your mobile number? ');

    contacts.saveContact(name, email, mobile);
};

// memanggil fungsi main dan menampilkan
main();