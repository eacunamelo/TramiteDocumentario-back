import { Router } from 'express';
import { procedimientoController } from '../../controllers/core/procedimiento.controllers';

export var procedimientoRouter = Router();

procedimientoRouter.get('/procedimientogetall', procedimientoController.getAll);
procedimientoRouter.post('/procedimientocreate', procedimientoController.create);
procedimientoRouter.post('/procedimientoupdate', procedimientoController.update);
procedimientoRouter.post('/procedimientodelete', procedimientoController.delete);
procedimientoRouter.get('/procedimientofindbyid/:Id', procedimientoController.findById);