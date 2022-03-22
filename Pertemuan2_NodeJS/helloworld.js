// readline library
var readlineSync = require('readline-sync');

// user memasukkan nama
var nama = readlineSync.question('Masukkan nama anda: ');

// user memasukkan umur
var umur = readlineSync.question('Masukkan umur anda: ');

// user memasukkan domisili
var domisili = readlineSync.question('Masukkan domisili anda: ');

console.log('Perkenalkan nama saya '+ nama + ',saya berusia '+ umur + ' tahun dan domisili saya di '+ domisili + '.');