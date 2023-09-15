import { triggerAsyncId } from "async_hooks";

export var procedimientoModel = (sequelize:any, type:any)=>{
    let procedimiento = sequelize.define('Procedimientos',{
        Id:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        Nombre:{
            type: type.STRING(),
            allowNull: false
        },
        Descripcion:{
            type: type.STRING(),
            allowNull: true
        },
        Estado:{
            type: type.BOOLEAN,
            allowNull: false  
        }
    },
    {
        timestamps: false,
        tableName:'Procedimientos'
    });
    return procedimiento;
};