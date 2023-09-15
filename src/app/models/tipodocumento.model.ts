export var tipoDocumentoModel = (sequelize:any, type:any)=>{
    let tipodocumento = sequelize.define('TiposDocumento',{
        Id:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        Nombre:{
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
        tableName: 'TiposDocumento'
    });
    return tipodocumento
};