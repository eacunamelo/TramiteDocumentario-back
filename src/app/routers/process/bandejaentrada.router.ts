import { Router } from 'express';
import { bandejaEntradaController } from '../../controllers/process/bandejaentrada.controller';

export var bandejaEntradaRouter = Router();

bandejaEntradaRouter.get('/bandejaentradagetall/:Id', bandejaEntradaController.getAll);