import { Router } from 'express';
import { areaController } from '../../controllers/core/area.controller';

export var areaRouter = Router();

areaRouter.get('/areagetall', areaController.getAll);
areaRouter.post('/areacreate', areaController.create);
areaRouter.post('/areaupdate', areaController.update);
areaRouter.post('/areadelete', areaController.delete);
areaRouter.get('/areafindbyid/:Id', areaController.findById);