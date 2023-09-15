export var personaModel = (sequelize:any, type:any)=>{
    let persona = sequelize.define('Personas',{
        Id:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        TipoDocumento:{
            type: type.STRING(25),
            allowNull: false
        },
        Documento:{
            type: type.STRING(25),
            unique: true,
            allowNull: false
        },
        Nombres:{
            type: type.STRING(45),
            allowNull: true
        },
        Apellidos:{
            type: type.STRING(45),
            allowNull: true
        },
        RazonSocial:{
            type: type.STRING(45),
            allowNull: true
        },
        Celular:{
            type: type.STRING(15),
            allowNull: true
        },
        Correo:{
            type: type.STRING(60),
            unique: true,
            allowNull: true
        },
        Estado:{
            type: type.BOOLEAN,
            allowNull: false
        }
    },
    {
        timestamps: false,
        tableName:'Personas'
    });
    return persona;
};