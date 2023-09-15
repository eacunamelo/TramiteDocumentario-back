import { Router } from 'express';
import { genericsController } from '../../controllers/process/generics.controller';

export var genericsRouter = Router();

genericsRouter.get('/expedientebyidwithlistofdocuments/:Id', genericsController.expedienteByIdWithListOfDocuments);
genericsRouter.get('/getpersonabyidusuario/:Param', genericsController.getPersonaByIdUsuario);