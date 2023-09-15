import { Router } from 'express';
import { estadoExpedienteController } from '../../controllers/core/estadoExpediente.controller';

export var estadoExpedienteRouter = Router();

estadoExpedienteRouter.get('/estadoexpedientegetall', estadoExpedienteController.getAll);
estadoExpedienteRouter.post('/estadoexpedientecreate', estadoExpedienteController.create);
estadoExpedienteRouter.post('/estadoexpedienteupdate', estadoExpedienteController.update);
estadoExpedienteRouter.post('/estadoexpedientedelete', estadoExpedienteController.delete);
estadoExpedienteRouter.get('/estadoexpedientefindbyid/:Id', estadoExpedienteController.findById);