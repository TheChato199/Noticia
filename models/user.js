'use strict';

module.exports=(sequelize, DataTypes)=>{
    const usuario=sequelize.define('user' ,{
        correo:{type:DataTypes.STRING(100),unique:true},
        nombre:{type:DataTypes.STRING(100),defaultValue:"NONE"},
        clave:{type:DataTypes.STRING(100),allowNull:false},
        external:{type:DataTypes.UUID,defaultValue:DataTypes.UUIDv4},
        estado  :{type:DataTypes.BOOLEAN,defaultValue:true}
    },{freezeTableName:true});
    usuario.associate=function(models){
        usuario.hasMany(models.noticia,{foreignKey:'id_user',as:'noticia'});
    }
    return usuario;
}