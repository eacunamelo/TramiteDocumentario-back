import { Request, Response } from 'express';
import { usuarioSequelize, personaSequelize, areaSequelize } from '../../config/sequelize';

export var usuarioController = {
    getAll: (req: Request, res: Response) => {
        usuarioSequelize.findAll({
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
        let IdPersona = req.body.IdPersona;
        let IdArea = req.body.IdArea;
        personaSequelize.findByPk(IdPersona).then((registroEncontrado: any) => {
            if (registroEncontrado)
                return areaSequelize.findByPk(IdArea);
            else {
                let response = {
                    message: "Errror",
                    content: "No existe la Persona con Id=" + IdPersona
                }
                res.status(500).send(response);
                throw "No existe la Persona con Id=" + IdPersona;
            }
        }).then((registroEncontrado: any) => {
            if (registroEncontrado)
                return usuarioSequelize.create(req.body);
            else {
                let response = {
                    message: "Errror",
                    content: "No existe el Área con Id=" + IdArea
                }
                res.status(500).send(response);
                throw "No existe el Área con Id=" + IdArea;
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
        usuarioSequelize.update(req.body,
            {
                where: {
                    Id: req.body.Id
                }
            }).then((respuesta: any) => {
                if (respuesta[0] === 1) {
                    usuarioController.findById(req, res);
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
        usuarioSequelize.update(
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
        usuarioSequelize.findByPk(req.params.Id).then((registroEncontrado: any) => {
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