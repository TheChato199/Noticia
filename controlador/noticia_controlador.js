'use strict';
const models = require('./../models');
var noticia = models.noticia;
var usuario = models.user;
var uuid = require('uuid');

class noticia_controlador{
    async listar(req, res){
        const lista = await noticia.findAll({
            attributes:['titulo','cuerpo', 'fecha','external','estado']
        });
        res.status(200);
        res.json({msg:"OK",code:200,data:lista});
    }
    async guardar(req, res){
        const users = await usuario.findOne({
            //attributes:['nombre','correo','external','estado'],
            where:{external:req.body.external_user}
        }); 
        if(users!=null){
            const data = {
                titulo:req.body.titulo,
                cuerpo:req.body.cuerpo,
                fecha:req.body.fecha,
                external:uuid.v4(),
                id_user:users.id
            };
    
            let noticias = await noticia.create(data);
            if(noticias !=null && noticias != undefined){
                res.status(200);
                res.json({msg:"OK",code:200,data:"Se ha registrado"});
            }else{
                res.status(400);
                res.json({msg:"Solicitud no valida",code:400,data:"No se ha registrado"});
            }
        }else{
            res.status(400);
            res.json({msg:"OK",code:400,data:"Usuario no encontrado"});
        }
        }
    async buscar(req, res){
        const noticias = await noticia.findOne({
            attributes:['titulo','cuerpo','fecha', 'external', 'estado'],
            where:{external:req.params.external_noticia}
        });

        res.status(200);

        if(noticias != null){
            res.json({msg: "OK", code: 200, data: noticias});
        }else{
            res.json({msg: "Solicitud no valida", code: 400, data: [] });
        }
    }
    async actualizar(req, res){
        const noticias = await noticia.findOne({
            where:{external:req.body.external_noticia}
        });    

        if(noticias != null){
            noticias.titulo=req.body.titulo;
            noticias.cuerpo=req.body.cuerpo;
            noticias.external=uuid.v4();
            const noticiasA = await noticias.save();

            if(noticiasA !=null && noticiasA != undefined){
                res.status(200);
                res.json({msg:"OK",code:200,data:"Se ha modificado"});
            }else{
                res.status(400);
                res.json({msg:"Solicitud no valida",code:400,data:"No se ha modificado"});
            }
        }else{
            res.json({msg: "Solicitud no valida", code: 400, data: "No se encontro la noticia" });
        }
    }
}
module.exports=noticia_controlador;    