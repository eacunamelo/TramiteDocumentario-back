import { Router } from 'express';
import { movimientoExpedienteController } from '../../controllers/core/movimientoexpediente.controllers';

export var movimientoExpedienteRouter = Router();

movimientoExpedienteRouter.get('/movimientoexpedientegetall', movimientoExpedienteController.getAll);
movimientoExpedienteRouter.post('/movimientoexpedientecreate', movimientoExpedienteController.create);
movimientoExpedienteRouter.post('/movimientoexpedienteupdate', movimientoExpedienteController.update);
movimientoExpedienteRouter.post('/movimientoexpedientedelete', movimientoExpedienteController.delete);
