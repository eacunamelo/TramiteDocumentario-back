export var areaModel = (sequelize:any, type:any)=>{
    let area = sequelize.define('Areas',{
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
        Estado:{
            type: type.BOOLEAN,
            allowNull: false
        }
    },
    {
        timestamps: false,
        tableName:'Areas'
    });
    return area;
};