// ** Importaciones **
// Configuración del Servidor
import Server from './src/app/config/server';

// Enrrutadores
import { expedienteRouter } from './src/app/routers/core/expediente.router';
import { movimientoExpedienteRouter } from './src/app/routers/core/movimientoexpediente.router';
import { procedimientoRouter } from './src/app/routers/core/procedimiento.router';
import { usuarioRouter } from './src/app/routers/core/usuario.router';
import { areaRouter } from './src/app/routers/core/area.router';
import { personaRouter } from './src/app/routers/core/persona.router';
import { tipoDocumentoRouter } from './src/app/routers/core/tipoDocumento.router';
import { estadoExpedienteRouter } from './src/app/routers/core/estadoExpediente.router';
import { documentoRouter } from './src/app/routers/core/documento.router';
import { recepcionDocumentoExternoRouter } from './src/app/routers/process/recepciondocumentoexterno.router';
import { bandejaAdmisionDocumentoExternoRouter } from './src/app/routers/process/bandejaadmisiondocumentoexterno.router';
import { genericsRouter } from './src/app/routers/process/generics.router';
import { bandejaEntradaRouter } from './src/app/routers/process/bandejaentrada.router';
const server = new Server();

// Asignación de los enrrutadores

// Core
server.app.use('/business', expedienteRouter);
server.app.use('/business', movimientoExpedienteRouter);
server.app.use('/business', procedimientoRouter);
server.app.use('/business', areaRouter);
server.app.use('/business', personaRouter);
server.app.use('/business', usuarioRouter);
server.app.use('/business', tipoDocumentoRouter);
server.app.use('/business', estadoExpedienteRouter);
server.app.use('/business', documentoRouter);

// Process
server.app.use('/business', recepcionDocumentoExternoRouter);
server.app.use('/business', bandejaAdmisionDocumentoExternoRouter);
server.app.use('/business', bandejaEntradaRouter);
server.app.use('/business', genericsRouter);

//Arranque del proyecto
server.iniciar();