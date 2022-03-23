const validator = require('validator');

// validasi email
console.log(validator.isEmail('albert@gmail.com'));

// validasi mobile phone
console.log(validator.isMobilePhone('085722250577', 'id-ID'));