'use strict';
const models = require('./../models');
var usuario = models.user;
var uuid = require('uuid');
const {validationResult}=require('express-validator');

class user_controlador{
    async listar(req, res){
        const lista = await usuario.findAll({
            attributes:['nombre','correo','external','estado']
        });
        res.status(200);
        res.json({msg:"OK",code:200,data:lista});
    }
    async guardar(req, res){
        let errors = validationResult(req);
        if(errors.isEmpty()){
            const data = {  
                nombre:req.body.nombre,
                clave:req.body.clave,
                correo:req.body.correo,
                external:uuid.v4()
            };
    
            let user = await usuario.create(data);
            if(user !=null && user != undefined){
                res.status(200);
                res.json({msg:"OK",code:200,data:"Se ha registrado"});
            }else{
                res.status(400);
                res.json({msg:"Solicitud no valida",code:400,data:"No se ha registrado"});
            }
        }else{
            res.status(400);
            res.json({msg:"errors", code:400, data:errors});
        }
    }
    async buscar(req, res){
        const users = await usuario.findOne({
            attributes:['nombre','correo','external','estado'],
            where:{external:req.params.external}
        });

        res.status(200);

        if(users != null){
            res.json({msg: "OK", code: 200, data: users});
        }else{
            res.json({msg: "Solicitud no valida", code: 400, data: [] });
        }
    }
    async actualizar(req, res){
        const users = await usuario.findOne({
            where:{external:req.body.external}
        });    

        if(users != null){
            users.nombre=req.body.nombre;
            //user.correo=req.body.correo;
            users.external=uuid.v4();
            const userA = await user.save();

            if(userA !=null && userA != undefined){
                res.status(200);
                res.json({msg:"OK",code:200,data:"Se ha modificado"});
            }else{
                res.status(400);
                res.json({msg:"Solicitud no valida",code:400,data:"No se ha modificado"});
            }
        }else{
            res.json({msg: "Solicitud no valida", code: 400, data: "No se encontro el usuario" });
        }
    }
}
module.exports=user_controlador;    