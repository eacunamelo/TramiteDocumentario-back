export var documentoModel = (sequelize:any, type:any)=>{
    let documento = sequelize.define('Documentos',{
        Id:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        Codigo:{
            type: type.INTEGER,
            allowNull: false
        },
        FechaRegistro:{
            type: type.DATE,
            allowNull: false
        },
        Folios:{
            type: type.INTEGER,
            allowNull: false
        },
        Numero:{
            type: type.STRING(60),
            allowNull: true
        },
        Asunto:{
            type: type.STRING(200),
            allowNull: true
        },
        Referencia:{
            type: type.STRING(60),
            allowNull: true
        },
        Detalle:{
            type: type.TEXT,
            allowNull: true
        },
        ArchivoRuta:{
            type: type.STRING(255),
            allowNull: true
        },
        Ambito:{
            type: type.BOOLEAN,
            allowNull: false
        },
        Estado:{
            type: type.BOOLEAN,
            allowNull: false
        }
    },
    {
        timestamps: false,
        tableName:'Documentos'
    });
    return documento;
}