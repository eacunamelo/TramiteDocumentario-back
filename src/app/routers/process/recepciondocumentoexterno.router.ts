import { Router } from 'express';
import { recepcionDocumentoExternoController } from '../../controllers/process/recepciondocumentoexterno.controller';

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './src/assets/files' });

export var recepcionDocumentoExternoRouter = Router();

recepcionDocumentoExternoRouter.post('/recepciondocumentoexternoreceive', recepcionDocumentoExternoController.receive);
recepcionDocumentoExternoRouter.post('/recepciondocumentoexternouploadfile', multipartMiddleware, recepcionDocumentoExternoController.uploadFile);
recepcionDocumentoExternoRouter.post('/recepciondocumentoexternodeletefile', recepcionDocumentoExternoController.deleteFile);