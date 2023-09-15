import { Request, Response } from 'express';
import { movimientoExpedienteSequelize, personaSequelize, expedienteSequelize } from '../../config/sequelize';

export var movimientoExpedienteController = {
    getAll: (req: Request, res: Response) => {
        movimientoExpedienteSequelize.findAll({
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
        let IdExpediente = req.body.IdExpediente;
        let IdPersonaEmsor = req.body.IdPersonaEmsor;
        let IdPersonaDestinatario = req.body.IdPersonaDestinatario;
        expedienteSequelize.findByPk(IdExpediente).then((registroEncontrado: any) => {
            if (registroEncontrado)
                return personaSequelize.findByPk(IdPersonaEmsor);
            else {
                let response = {
                    message: "Error",
                    content: "No existe el Expediente con Id=" + IdExpediente
                }
                res.status(500).send(response);
                throw "No existe el Expediente con Id=" + IdExpediente;
            }
        }).then((registroEncontrado: any) => {
            if (registroEncontrado)
                return personaSequelize.findByPk(IdPersonaDestinatario);
            else {
                let response = {
                    message: "Error",
                    content: "No existe el Emisor con Id=" + IdPersonaEmsor
                }
                res.status(500).send(response);
                throw "No existe el Emisor con Id=" + IdPersonaEmsor;
            }
        }).then((registroEncontrado: any) => {
            if (registroEncontrado)
                return movimientoExpedienteSequelize.create(req.body);
            else {
                let response = {
                    message: "Error",
                    content: "No existe el Destinatario con Id=" + IdPersonaEmsor
                }
                res.status(500).send(response);
                throw "No existe el Destinatario con Id=" + IdPersonaEmsor;
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
        movimientoExpedienteSequelize.update(req.body,
            {
                where: {
                    Id: req.body.Id
                }
            }).then((respuesta: any) => {
                if (respuesta[0] === 1) {
                    movimientoExpedienteController.findById(req, res);
                }
                else {
                    let response = {
                        message: "Error",
                        content: "No se actualizaron los datos del registro con el Id = " + req.body.Id
                    }
                    res.status(500).send(response);
                    throw "No se actualizaron los datos del registro con el Id = " + req.body.Id;
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
        movimientoExpedienteSequelize.update(
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
                throw "Al eliminar -> " + error;
            });
    },
    findById: (req: Request, res: Response) => {
        movimientoExpedienteSequelize.findByPk(req.params.Id).then((registroEncontrado: any) => {
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