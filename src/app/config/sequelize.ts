import { expedienteModel } from "../models/expediente.model";
import { movimientoExpedienteModel } from "../models/movimientoexpediente.model";
import { procedimientoModel } from "../models/procedimiento.model";
import { usuarioModel } from "../models/usuario.model";
import { areaModel } from "../models/area.model";
import { personaModel } from "../models/persona.model";
import { tipoDocumentoModel } from "../models/tipodocumento.model";
import { estadoExpedienteModel } from "../models/estadoexpediente.model";
import { documentoModel } from "../models/documento.model";


const Sequelize = require('sequelize');
const sequelize = new Sequelize('tramitedocumentario', 'root', 'admin', {
    host: 'localhost',
// const sequelize = new Sequelize('tramitedocumentario', 'root', 'Admin2019.', {
//     host: '139.180.141.51',
    dialect: 'mysql',
    operatorAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    timezone: '-05:00'
});

// Exportación de entidades
export const procedimientoSequelize = procedimientoModel(sequelize, Sequelize);
export const estadoExpedienteSequelize = estadoExpedienteModel(sequelize, Sequelize);
export const tipoDocumentoSequelize = tipoDocumentoModel(sequelize, Sequelize);
export const areaSequelize = areaModel(sequelize, Sequelize);
export const personaSequelize = personaModel(sequelize, Sequelize);
export const usuarioSequelize = usuarioModel(sequelize, Sequelize);
export const expedienteSequelize = expedienteModel(sequelize, Sequelize);
export const movimientoExpedienteSequelize = movimientoExpedienteModel(sequelize, Sequelize);
export const documentoSequelize = documentoModel(sequelize, Sequelize);

//Relaciones
usuarioSequelize.belongsTo(personaSequelize, { foreignKey: 'IdPersona' });
personaSequelize.hasMany(usuarioSequelize, { foreignKey: 'IdPersona' });

usuarioSequelize.belongsTo(areaSequelize, { foreignKey: 'IdArea' });
areaSequelize.hasMany(usuarioSequelize, { foreignKey: 'IdArea' });

expedienteSequelize.belongsTo(estadoExpedienteSequelize, { foreignKey: 'IdEstado' });
estadoExpedienteSequelize.hasMany(expedienteSequelize, { foreignKey: 'IdEstado' });

expedienteSequelize.belongsTo(procedimientoSequelize, { foreignKey: 'IdProcedimiento' });
procedimientoSequelize.hasMany(expedienteSequelize, { foreignKey: 'IdProcedimiento' });

movimientoExpedienteSequelize.belongsTo(expedienteSequelize, { foreignKey: 'IdExpediente' });
expedienteSequelize.hasMany(movimientoExpedienteSequelize, { foreignKey: 'IdExpediente' });

movimientoExpedienteSequelize.belongsTo(usuarioSequelize, { foreignKey: 'IdUsuarioEmisor' });
usuarioSequelize.hasMany(movimientoExpedienteSequelize, { foreignKey: 'IdUsuarioEmisor' });

movimientoExpedienteSequelize.belongsTo(usuarioSequelize, { foreignKey: 'IdUsuarioDestinatario' });
usuarioSequelize.hasMany(movimientoExpedienteSequelize, { foreignKey: 'IdUsuarioDestinatario' });

documentoSequelize.belongsTo(tipoDocumentoSequelize, { foreignKey: 'IdTipoDocumento' });
tipoDocumentoSequelize.hasMany(documentoSequelize, { foreignKey: 'IdTipoDocumento' });
documentoSequelize.belongsTo(expedienteSequelize, { foreignKey: 'IdExpediente' });
expedienteSequelize.hasMany(documentoSequelize, { foreignKey: 'IdExpediente' });
documentoSequelize.belongsTo(personaSequelize, { foreignKey: 'IdPersona' });
personaSequelize.hasMany(documentoSequelize, { foreignKey: 'IdPersona' });

sequelize.authenticate().then(() => {
    console.log('Conexión a la base de datos exitosa');
}).catch(() => {
    console.error('Error al conectar a la base de datos');
});

sequelize.transaction((response:any)=>{
    var options = { raw: true, transaction: response }  
    sequelize.query('SET FOREIGN_KEY_CHECKS = 0', options).then(()=>{
        return sequelize.query('truncate table myTable', options)
      }).then(()=>{
        return sequelize.query('SET FOREIGN_KEY_CHECKS = 1', options)
      }).catch((error:any)=>{
        throw `${error}`;
    });
  }).then(()=>{
    sequelize.sync({ force: false }).then(() => {
        console.log("Se creó la base de datos");
    }).catch((error: any) => {
        console.log(error);
    });
  }).catch((error:any)=>{
      throw `${error}`;
  });