import { Request, Response } from 'express';
import { expedienteSequelize, documentoSequelize, personaSequelize } from '../../config/sequelize';
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

export var bandejaAdmisionDocumentoExternoController = {
    getAll: (req: Request, res: Response) => {
        expedienteSequelize.findAll({
            where: {
                [Op.or]: [{ IdEstado: 1 }, { IdEstado: 2, EstadoObservacion: 0 }],
                Estado: true
            },
            include: [{
                model: documentoSequelize,
                where: {
                    Ambito: true,
                    Estado: true
                },
                include: [{
                    model:personaSequelize
                }]
            }]
        }).then((registrosEncontrados: any) => {
            let response = {
                message: "Ok",
                content: registrosEncontrados
            }
            res.status(200).send(response);
        }).catch((error: any) => {
            let response = {
                message: "Error",
                content: `${error}`
            }
            res.status(500).send(response);
            throw `${error}`;
        });
    }
}