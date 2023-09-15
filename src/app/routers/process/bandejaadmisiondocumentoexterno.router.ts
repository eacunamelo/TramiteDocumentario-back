import { Router } from 'express';
import { bandejaAdmisionDocumentoExternoController } from '../../controllers/process/bandejaadmisiondocumentoexterno.controller';

export var bandejaAdmisionDocumentoExternoRouter = Router();

bandejaAdmisionDocumentoExternoRouter.get('/bandejarecepciondocumentoexternogetall', bandejaAdmisionDocumentoExternoController.getAll);