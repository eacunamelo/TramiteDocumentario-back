import { triggerAsyncId } from "async_hooks";

export var movimientoExpedienteModel = (sequelize:any, type:any)=>{
    let movimientoExpediente = sequelize.define('MovimientosExpediente',{
        Id:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        Descripcion:{
            type: type.STRING(), //cambiar
            allowNull: true
        },
        FechaEnvio:{
            type: type.DATE,
            allowNull: true
        },
        FechaRecepcion:{
            type: type.DATE,
            allowNull: true
        },
        Tipo:{
            type: type.BOOLEAN, //cambiar
            allowNull: false
        },
        Estado:{
            type: type.BOOLEAN,
            allowNull: false
        }
    },
    {
        timestamps: false,
        tableName:'MovimientosExpediente'
    });
    return movimientoExpediente;
};