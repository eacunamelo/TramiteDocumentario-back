import { Router } from 'express';
import { documentoController } from '../../controllers/core/documento.controller';

export var documentoRouter = Router();

documentoRouter.get('/documentogetall', documentoController.getAll);
documentoRouter.post('/documentocreate', documentoController.create);
documentoRouter.post('/documentoupdate', documentoController.update);
documentoRouter.post('/documentodelete', documentoController.delete);
documentoRouter.get('/documentofindbyid/:Id', documentoController.findById);