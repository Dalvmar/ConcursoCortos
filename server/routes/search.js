const express = require('express');
const router = express.Router();
const Video = require('../models/Videos');
const User = require('../models/User');



// ==============================
// Busqueda por colección
// ==============================
router.get('/coleccion/:tabla/:busqueda', (req, res) => {

    var busqueda = req.params.busqueda;
    var tabla = req.params.tabla;
    var regex = new RegExp(busqueda, 'i');

    var promesa;

    switch (tabla) {

        case 'users':
            promesa = searchUsers(busqueda, regex);
            break;

        case 'videos':
            promesa = searchVideos(busqueda, regex);
            break;


        default:
            return res.status(400).json({
                ok: false,
                mensaje: 'Los tipos de busqueda sólo son: usuarios y  videos',
                error: { message: 'Tipo de tabla/coleccion no válido' }
            });

    }

    promesa.then(data => {

        res.status(200).json({
            ok: true,
            [tabla]: data
        });

    })

});


// ==============================
// Busqueda general
// ==============================
router.get('/todo/:busqueda', (req, res, next) => {

    var busqueda = req.params.busqueda;
    var regex = new RegExp(busqueda, 'i');


    Promise.all([
            searchUsers(busqueda, regex),
            searchVideos(busqueda, regex),
          
        ])
        .then(respuestas => {

            res.status(200).json({
                ok: true,
                usuarios: respuestas[0],
                videos: respuestas[1],
              
            });
        })


});


function searchVideos(busqueda, regex) {

    return new Promise((resolve, reject) => {

        Video.find({},'like unlike author creator commment video')
           
            .populate('commment')
            .populate({ path:'commment', populate: { path: 'author' }})
            .or({ 'creator': regex }, {'email':regex})
            .exec((err, videos) => {
         
                if (err) {
                    reject('Error al cargar videos', err);
                } else {
                    resolve(videos)
                }
            });
    });
}



function searchUsers(busqueda, regex) {

    return new Promise((resolve, reject) => {

        User.find({}, 'username name lastname email')
            .or([{ 'name': regex }, { 'email': regex }])
            .exec((err, usuarios) => {

                if (err) {
                    reject('Error al cargar usuarios', err);
                } else {
                    resolve(usuarios);
                }


            })


    });
}



 module.exports = router;