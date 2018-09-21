const express = require('express');
const router  = express.Router();
const fileUpload = require('express-fileupload');
const New =require ('../models/News')
var fs = require('fs');


// default options
router.use(fileUpload());

router.get('/', (req, res, next) => {

    res.status(400).json({
        ok: true,
        mensaje: 'Peticion realizada correctamente',
    });

});

router.put('/:tipo/:id',(req, res)=> {
  
    var id = req.params.id;
var tipo=req.params.tipo
  if (!req.files){
     return res.status(400).json({
        ok: false,
        mensaje: 'No seleccionó nada',
        errors:{
            message:'Debe seleccionar una imagen'
        }
    });
  }

  // Obtener nombre del archivo
  var archivo = req.files.img;
  
  var nombreCortado = archivo.name.split('.');
  var extensionArchivo = nombreCortado[nombreCortado.length - 1];

  // Sólo estas extensiones aceptamos
  var extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];
  
  if (extensionesValidas.indexOf(extensionArchivo) < 0) {
    return res.status(400).json({
        ok: false,
        mensaje: 'Extension no válida',
        errors: { message: 'Las extensiones válidas son ' + extensionesValidas.join(', ') }
    });
}

// Nombre de archivo personalizado
// 12312312312-123.png
var nombreArchivo = `${ id }-${ new Date().getMilliseconds() }.${ extensionArchivo }`;


// Mover el archivo del temporal a un path
var path = `./uploads/${ tipo }/${ nombreArchivo }`;

archivo.mv(path, err => {

    if (err) {
        return res.status(500).json({
            ok: false,
            mensaje: 'Error al mover archivo',
            errors: err
        });
    }


 subirPorTipo(tipo, id, nombreArchivo, res);

})



});



function subirPorTipo(tipo, id, nombreArchivo, res) {

if (tipo === 'news') {

    New.findById(id, (err, noticia) => {

    if (!noticia) {
        return res.status(400).json({
            ok: true,
            mensaje: 'Noticia no existe',
            errors: { message: 'noticia no existe' }
        });
    }


    var pathViejo = './uploads/news/' + noticia.img;

    // Si existe, elimina la imagen anterior
    if (fs.existsSync(pathViejo)) {
        fs.unlink(pathViejo);
    }

    noticia.img = nombreArchivo;

    noticia.save((err, noticiaActualizada) => {

    

        return res.status(200).json({
            ok: true,
            mensaje: 'Imagen de noticia actualizada',
            noticia: noticiaActualizada
        });

    })


});

}

}


module.exports = router;