export var usuarioModel = (sequelize:any, type:any)=>{
    let usuario = sequelize.define('Usuarios',{
        Id:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        Nombre:{
            type: type.STRING(50),
            allowNull: false
        },
        Contrasena:{
            type: type.STRING(20),
            allowNull: false
        },
        Estado:{
            type: type.BOOLEAN,
            allowNull: false
        }
    },
    {
        timestamps: false,
        tableName:'Usuarios'
    });
    return usuario;
};