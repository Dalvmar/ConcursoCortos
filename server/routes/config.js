const express = require('express');
const router  = express.Router();
const Config = require('../models/config')

Config.create();

router.get('/',(req,res)=>{
  console.log("entro en config")
  
Config.find()
.exec(
    (err,variable) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando config',
                errors: err
            });
        }

        Config.countDocuments( (err, conteo) => {

            res.status(200).json({
              
                config: variable,
            
            });
        }) 

    });
});

router.put('/:id', (req, res) => {

    var id = req.params.id;
    var body = req.body;
console.log(body.enableVideos)
    Config.findById(id, (err,variable) => {


        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar variable',
                errors: err
            });
        }

        if (!variable) {
            
            return res.status(400).json({
                ok: false,
                mensaje: 'La config con el id ' + id + ' no existe',
                errors: { message: 'No existe un config con ese ID' }
            });
        }


        variable.enableVideos = body.enableVideos;


        variable.save((err, configGuardada) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar config',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                enable: configGuardada
            });

        });

    });

});


module.exports= router;
