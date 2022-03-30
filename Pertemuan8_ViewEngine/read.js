const fs = require('fs');

const readHtml = (path, res) => {
    fs.readFile(path, (err, data) => { //membaca file apakah ada atau tidak
        if(err){
            res.writeHead(404);
            res.write('Error : page not found');
        } else {
            res.write(data);
        }
        res.end();
    });
}
module.exports = {readHtml};

