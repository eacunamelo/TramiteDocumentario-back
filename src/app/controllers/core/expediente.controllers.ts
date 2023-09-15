import { Request, Response } from 'express';
import { expedienteSequelize, procedimientoSequelize, estadoExpedienteSequelize } from '../../config/sequelize';
const Sequelize = require('sequelize');

export var expedienteController = {
    getAll: (req: Request, res: Response) => {
        expedienteSequelize.findAll({
            where: {
                Estado: true
            }
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
    },
    create: (req: Request, res: Response) => {
        let expediente = expedienteSequelize.build(req.body);
        expedienteSequelize.findOne({ attributes: [[Sequelize.fn('max', Sequelize.col('Codigo')), 'Codigo']] }).then((registroEncontrado:any)=>{
            if (registroEncontrado)
            {
                expediente.Codigo = registroEncontrado.dataValues.Codigo + 1;
                return procedimientoSequelize.findByPk(expediente.IdProcedimiento);
            }
            else
            {
                let response = {
                    message: "Error",
                    content: "No se pudo obtener el correlativo del Expediente"
                }
                res.status(500).send(response);
                throw "No se pudo obtener el correlativo del Expediente";
            }
        }).then((registroEncontrado: any) => {
            if (registroEncontrado)
                return estadoExpedienteSequelize.findByPk(expediente.IdEstadoExpediente);
            else {
                let response = {
                    message: "Errror",
                    content: "No existe el Procedimiento con Id=" + expediente.IdProcedimiento
                }
                res.status(500).send(response);
                throw "No existe el Procedimiento con Id=" + expediente.IdProcedimiento;
            }
        }).then((registroEncontrado: any) => {
            if (registroEncontrado)
                return expediente.save();
            else {
                let response = {
                    message: "Errror",
                    content: "No existe el Procedimiento con Id=" + expediente.IdProcedimiento
                }
                res.status(500).send(response);
                throw "No existe el Procedimiento con Id=" + expediente.IdProcedimiento;
            }
        }).then((registroCreado: any) => {
            let response = {
                message: "Ok",
                content: registroCreado
            }
            res.status(201).send(response);
        }).catch((error: any) => {
            let response = {
                message: "Error",
                content: `${error}`
            }
            res.status(500).send(response);
            throw `${error}`;
        });
    },
    update: (req: Request, res: Response) => {
        expedienteSequelize.update(req.body,
            {
                where: {
                    Id: req.body.Id
                }
            }).then((respuesta: any) => {
                if (respuesta[0] === 1) {
                    expedienteController.findById(req, res);
                }
                else {
                    let response = {
                        message: "Error",
                        content: "No se actualizaron los datos del registro con el Id = " + req.body.Id
                    }
                    res.status(500).send(response);
                }
            }).catch((error: any) => {
                let response = {
                    message: "Error",
                    content: "Al actualizar -> " + error
                }
                res.status(500).send(response);
                throw "Al actualizar -> " + error;
            });
    },
    delete: (req: Request, res: Response) => {
        expedienteSequelize.update(
            {
                Estado: false
            },
            {
                where: {
                    Id: req.body.Id
                }
            }).then((respuesta: any) => {
                if (respuesta[0] === 1) {
                    let response = {
                        message: "Ok",
                        content: "Se eliminó el registro con el Id = " + req.body.Id
                    }
                    res.status(200).send(response);
                }
                else {
                    let response = {
                        message: "Error",
                        content: "No se eliminó el registro con el Id = " + req.body.Id
                    }
                    res.status(500).send(response);
                    throw "No se eliminó el registro con el Id = " + req.body.Id;
                }
            }).catch((error: any) => {
                let response = {
                    message: "Error",
                    content: "Al eliminar -> " + error
                }
                res.status(500).send(response);
            });
    },
    findById: (req: Request, res: Response) => {
        expedienteSequelize.findByPk(req.params.Id).then((registroEncontrado: any) => {
            let response = {
                message: "Ok",
                content: registroEncontrado
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