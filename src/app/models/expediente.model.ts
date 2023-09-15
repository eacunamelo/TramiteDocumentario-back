import { triggerAsyncId } from "async_hooks";

export var expedienteModel = (sequelize:any, type:any)=>{
    let expediente = sequelize.define('Expedientes',{
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
        FechaRecepcion:{
            type: type.DATE,
            allowNull: true
        },
        FechaAdmision:{
            type: type.DATE,
            allowNull: true
        },
        FechaFin:{
            type: type.DATE,
            allowNull: true
        },
        DetalleFin:{
            type: type.STRING(), //cambiar
            allowNull: true
        },
        EstadoObservacion:{
            type: type.BOOLEAN,
            allowNull: true
        },
        DetalleObservacion:{
            type: type.STRING(), //cambiar
            allowNull: true
        },
        Estado:{
            type: type.BOOLEAN,
            allowNull: false
        }
    },
    {
        timestamps: false,
        tableName:'Expedientes'
    });
    return expediente;
};