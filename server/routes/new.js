const express = require('express');
const router  = express.Router();

const New = require('../models/News');



// ==========================================
// Obtener todos los noticias
// ==========================================
router.get('/', (req, res, next) => {

    New.find({}).sort({updated_at:-1})
       
        .exec(
            (err,noticias) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando noticia',
                        errors: err
                    });
                }

                New.count({}, (err, conteo) => {

                    res.status(200).json({
                        ok: true,
                        noticias: noticias,
                        total: conteo
                    });
                }) 

            });
});


// ==========================================
// Actualizar New
// ==========================================
router.put('/:id', (req, res) => {

    var id = req.params.id;
    var body = req.body;

    New.findById(id, (err,noticia) => {


        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar noticia',
                errors: err
            });
        }

        if (!noticia) {
            return res.status(400).json({
                ok: false,
                mensaje: 'La noticia con el id ' + id + ' no existe',
                errors: { message: 'No existe un noticia con ese ID' }
            });
        }


        noticia.title = body.title;
        noticia.description = body.description;

        noticia.save((err, noticiaGuardado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar noticia',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                noticia: noticiaGuardado
            });

        });

    });

});



// ==========================================
// Crear un nuevo noticia
// ==========================================
router.post('/', (req, res) => {

    var body = req.body;

    var noticia = new New({
        title: body.title,
        description: body.description,
     
    });

    noticia.save((err, noticiaGuardada) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear noticia',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            noticia: noticiaGuardada
        });


    });

});


// ============================================
//   Borrar un noticia por el id
// ============================================
router.delete('/:id', (req, res) => {

    var id = req.params.id;

    New.findByIdAndRemove(id, (err, noticiaBorrada) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error borrar noticia',
                errors: err
            });
        }

        if (!noticiaBorrada) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un noticia con ese id',
                errors: { message: 'No existe un noticia con ese id' }
            });
        }

        res.status(200).json({
            ok: true,
            noticia: noticiaBorrada
        });

    });

});


module.exports = router;
