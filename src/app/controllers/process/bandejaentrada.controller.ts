import { Request, Response } from 'express';
import { expedienteSequelize, personaSequelize, movimientoExpedienteSequelize, procedimientoSequelize, estadoExpedienteSequelize, usuarioSequelize } from '../../config/sequelize';
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

export var bandejaEntradaController = {
    getAll: (req: Request, res: Response) => {
        let Id = req.params.Id
        movimientoExpedienteSequelize.findAll({
            where: {
                IdUsuarioDestinatario: Id,
                Estado: true
            },
            include: [
                {
                    model: expedienteSequelize,
                    where: {
                        [Op.or]: [{ IdEstado: 2 }, { IdEstado: 3 }],
                        Estado: true
                    },
                    include: [
                        {
                            model: procedimientoSequelize,
                            where: {
                                Estado: true
                            }
                        },
                        {
                            model: estadoExpedienteSequelize,
                            where: {
                                Estado: true
                            }
                        }
                    ]
                },
                {
                    model: usuarioSequelize,
                    where: {
                        Estado: true
                    },                
                    include: {
                        model: personaSequelize
                    }
                }
            ]
        }).then((registrosEncontrados: any) => {
            if(registrosEncontrados)
            {
                let response = {
                    message: "Ok",
                    content: registrosEncontrados
                }
                res.status(200).send(response);
            }
            else
            {
                let response = {
                    message: "Error",
                    content: "No se encontraron registros"
                }
                res.status(500).send(response);
                throw "No se encontraron registros";
            }
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