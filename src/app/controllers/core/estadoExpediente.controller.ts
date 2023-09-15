import { Request, Response } from 'express';
import { estadoExpedienteSequelize } from '../../config/sequelize';

export var estadoExpedienteController = {
    getAll: (req: Request, res: Response) => {
        estadoExpedienteSequelize.findAll({
            where: {
                Estado: true
            }
        }).then((resgistrosEncontrados: any) => {
            let response = {
                message: "Ok",
                content: resgistrosEncontrados
            }
            res.status(200).send(response);
        }).catch((error: any) => {
            let response = {
                message: "Error",
                content: `${error}`
            }
            res.status(500).send(response);
            throw `${error}`;
        })
    },
    create: (req: Request, res: Response) => {
        estadoExpedienteSequelize.create(req.body).then((registroCreado: any) => {
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
        estadoExpedienteSequelize.update(req.body,
            {
                where: {
                    Id: req.body.Id
                }
            }).then((respuesta: any) => {
                if (respuesta[0] === 1) {
                    estadoExpedienteController.findById(req, res);
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
        estadoExpedienteSequelize.update(
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
        estadoExpedienteSequelize.findByPk(req.params.Id).then((registroEncontrado: any) => {
            let response = {
                message: "Ok",
                content: registroEncontrado
            }
            res.status(200).send(response);
        }).catch((error: any) => {
            let response = {
                message: "Error",
                content: error
            }
            res.status(500).send(response);
            throw `${error}`;
        });
    }

}