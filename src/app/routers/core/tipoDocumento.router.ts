import { Router } from 'express';
import { tipoDocumentoController } from '../../controllers/core/tipoDocumento.controller';

export var tipoDocumentoRouter = Router();

tipoDocumentoRouter.get('/tipodocumentogetall', tipoDocumentoController.getAll);
tipoDocumentoRouter.post('/tipodocumentocreate', tipoDocumentoController.create);
tipoDocumentoRouter.post('/tipodocumentoupdate', tipoDocumentoController.update);
tipoDocumentoRouter.post('/tipodocumentodelete', tipoDocumentoController.delete);
tipoDocumentoRouter.get('/tipodocumentofindbyid/:Id', tipoDocumentoController.findById);