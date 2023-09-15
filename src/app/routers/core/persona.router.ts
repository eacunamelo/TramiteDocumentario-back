import { Router } from 'express';
import { personaController } from '../../controllers/core/persona.controller';

export var personaRouter = Router();

personaRouter.get('/personagetall', personaController.getAll);
personaRouter.post('/personacreate', personaController.create);
personaRouter.post('/personaupdate', personaController.update);
personaRouter.post('/personadelete', personaController.delete);
personaRouter.get('/personafindbyid/:Id', personaController.findById);
personaRouter.get('/personafindbydocument/:Documento', personaController.findByDocument);