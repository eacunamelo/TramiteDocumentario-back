export var estadoExpedienteModel = (sequelize:any, type:any)=>{
    let estadoexpediente = sequelize.define('EstadosExpediente',{
        Id:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        Nombre:{
            type: type.STRING(25),
            allowNull: false
        },
        Estado:{
            type: type.BOOLEAN,
            allowNull: false
        }
    },
    {
        timestamps: false,
        tableName:'EstadosExpediente'
    });
    return estadoexpediente;
}