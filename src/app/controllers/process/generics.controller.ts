import { Request, Response } from 'express';
import { documentoSequelize, expedienteSequelize, personaSequelize, usuarioSequelize } from '../../config/sequelize';
import { expedienteController } from '../core/expediente.controllers';
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

export var genericsController = {
    expedienteByIdWithListOfDocuments: (req: Request, res: Response) => {
        let IdExpediente = req.params.Id;
        expedienteSequelize.findByPk(IdExpediente, {
            where: {
                Estado: true
            },
            include: [{
                model: documentoSequelize,
                where: {
                    Estado: true
                },
                include: [{
                    model: personaSequelize
                }]
            }]
        }).then((registrosEncontrados: any) => {
            if (registrosEncontrados) {
                let response = {
                    message: "Ok",
                    content: registrosEncontrados
                }
                res.status(200).send(response);
            }
            else {
                expedienteController.findById(req, res);
            }
        }).catch((error: any) => {
            let response = {
                message: "Error",
                content: `${error}`
            }
            res.status(500).send(response);
            throw `${error}`;
        });
    },
    getPersonaByIdUsuario: (req: Request, res: Response) => {
        let Param = req.params.Param;
        personaSequelize.findAll({
            attributes: ['Nombres', 'Apellidos'],
            where: {
                [Op.or]: [{Nombres: { [Op.like]: `%${Param}%` }}, {Apellidos: { [Op.like]: `%${Param}%` }}],
                Estado: true
            },
            include: {
                attributes: ['Id'],
                model: usuarioSequelize,
                where: {
                    Estado: true
                }
            }
        }).then((registroEncontrado: any) => {
            res.send(registroEncontrado);
        });
    }

}

