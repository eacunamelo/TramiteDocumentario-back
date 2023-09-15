import { Router } from 'express';
import { usuarioController } from '../../controllers/core/usuario.controller';

export var usuarioRouter = Router();

usuarioRouter.get('/usuariogetall', usuarioController.getAll);
usuarioRouter.post('/usuariocreate', usuarioController.create);
usuarioRouter.post('/usuarioupdate', usuarioController.update);
usuarioRouter.post('/usuariodelete', usuarioController.delete);
usuarioRouter.get('/usuariofindbyid/:Id', usuarioController.findById);