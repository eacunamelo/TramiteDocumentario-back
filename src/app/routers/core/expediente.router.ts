import { Router } from 'express';
import { expedienteController } from '../../controllers/core/expediente.controllers';

export var expedienteRouter = Router();

expedienteRouter.get('/expedientegetall', expedienteController.getAll);
expedienteRouter.post('/expedientecreate', expedienteController.create);
expedienteRouter.post('/expedienteupdate', expedienteController.update);
expedienteRouter.post('/expedientedelete', expedienteController.delete);
expedienteRouter.get('/expedientefindbyid/:Id', expedienteController.findById);