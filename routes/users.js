var express = require('express');
var router = express.Router();
const{body}= require('express-validator');  

const usuarioA = require('../controlador/user_controlador');
const user_controlador = new usuarioA();


const noticiaA = require('../controlador/noticia_controlador');
const noticia_controlador = new noticiaA();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get("/admin/user",user_controlador.listar);
router.post("/admin/user/guardar" [body('nombre','ingrese un nombre valido').trim().exists().not().isEmpty(),body('correo','ingrese un correo valido').trim().exists().not().isEmpty().isEmail(),body('clave','ingrese una clave valida').trim().exists().not().isEmpty()],user_controlador.guardar);
router.get("/admin/user/:external",user_controlador.buscar);
router.post("/admin/user/modificar",user_controlador.actualizar);


router.get("/admin/noticias",noticia_controlador.listar);
router.post("/admin/noticias/guardar",noticia_controlador.guardar);
router.get("/admin/noticias/:external_noticia",noticia_controlador.buscar);
router.post("/admin/noticias/modificar",noticia_controlador.actualizar);
module.exports = router;