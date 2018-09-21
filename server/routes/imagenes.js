var express = require('express');
var fs = require('fs');
var router = express();
const path =require('path');


router.get('/:tipo/:img', (req, res, next) => {

    var tipo = req.params.tipo;
    var img = req.params.img;
    var pathImg = path.resolve( __dirname, `../uploads/${ tipo }/${ img }`);

    if(fs.existsSync(pathImg) ) {
        res.sendfile(pathImg);
    }
        else {
            pathNoImage= './assets/no-img.jpg';
            res.sendfile(pathNoImage);
        
        }

});

module.exports = router;