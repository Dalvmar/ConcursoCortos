var express = require('express');
var fs = require('fs');
var router = express();
const path =require('path');


router.get('/:tipo/:img', (req, res, next) => {

    var tipo = req.params.tipo;
    var img = req.params.img;

    var pathImg = path.resolve( __dirname, `../uploads/${ tipo }/${ img }`);
    
    console.log(pathImg)
    if(fs.existsSync(pathImg) ) {
        res.sendFile(pathImg);
    }
        else {
           var pathNoImage=path.resolve( __dirname, '../assets/no-img.jpg');
            res.sendFile(pathNoImage);
        
        }

});

module.exports = router;