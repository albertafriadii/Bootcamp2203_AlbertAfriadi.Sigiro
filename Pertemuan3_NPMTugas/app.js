const { resolve } = require('path');
const readline = require('readline');
const validator = require('validator');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const tanyaNama = () => {
    return new Promise((resolve) => {
        rl.question('Siapa nama anda? ', nama => {
            if(nama){
                resolve(nama);
            } else {
                console.log('Nama tidak boleh kosong!\n');
                resolve(tanyaNama());
            }
        });
    });
};

const tanyaEmail = () => {
    return new Promise((resolve) => {
        rl.question('Apa alamat email anda? ', email => {
            if(!validator.isEmail(email)){
                console.log('Email yang anda masukkan salah!\n');
                resolve(tanyaEmail());
            } else {
                resolve(email);
            }
        });
    });
};

const tanyaMobile = () => {
    return new Promise((resolve) => {
        rl.question('Berapa nomor handphone anda? ', mobile => {
            if (!validator.isMobilePhone(mobile,'id-ID')) {
                console.log('Nomor yang dimasukkan salah!\n');
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