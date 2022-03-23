const { resolve } = require('path');
const readline = require('readline');
const validator = require('validator');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// rl.question('Siapa nama anda? ', (nama) => {
//     rl.question('Berapa nomor handphone anda? ', (nomorHandphone) => {
//         rl.question('Apa alamat email anda? ', (email) => {
//             console.log(`Halo ${nama}, nomor handphone anda ${nomorHandphone} dan alamat email anda adalah ${email}`);
//             rl.close();
//         });
//     });
// });

const tanyaNama = () => {
    return new Promise((resolve) => {
        rl.question('Siapa nama anda?\n', nama => {
            if(nama){
                resolve(nama);
            } else {
                console.log('Nama tidak boleh kosong!');
                resolve(tanyaNama());
            }
        });
    });
};

const tanyaEmail = () => {
    return new Promise((resolve) => {
        rl.question('Apa alamat email anda?\n', email => {
            if(!validator.isEmail(email)){
                console.log('Email yang anda masukkan salah!');
                resolve(tanyaEmail());
            } else {
                resolve(email);
            }
        });
    });
};

const tanyaMobile = () => {
    return new Promise((resolve) => {
        rl.question('Berapa nomor handphone anda?\n', mobile => {
            if (!validator.isMobilePhone(mobile)) {
                console.log('Nomor yang dimasukkan salah!');
                resolve(tanyaMobile());
            } else {
                resolve(mobile);
            }
        });
    });
};

const tanyaUser = async () => {
    const inputNama = await tanyaNama();
    const inputEmail = await tanyaEmail();
    const inputMobile = await tanyaMobile();
    
    console.log(`Halo ${inputNama}, email anda adalah ${inputEmail} dan nomor handphone anda ${inputMobile}`);
    rl.close();
};

tanyaUser();