import { Request, Response } from 'express';
import { documentoSequelize, expedienteSequelize, tipoDocumentoSequelize, personaSequelize } from '../../config/sequelize';
const Sequelize = require('sequelize');

export var documentoController = {
    getAll: (req: Request, res: Response) => {
        documentoSequelize.findAll({
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
        let documento = documentoSequelize.build(req.body);
        documentoSequelize.findOne({ attributes: [[Sequelize.fn('max', Sequelize.col('Codigo')), 'Codigo']] }).then((registroEncontrado: any)=>{
            if (registroEncontrado) {
                documento.Codigo = registroEncontrado.dataValues.Codigo + 1;
                return expedienteSequelize.findByPk(documento.IdExpediente);
            }
            else {
                let response = {
                    message: "Error",
                    content: "No se pudo obtener el correlativo del Documento"
                };
                res.status(500).send(response);
                throw "No se pudo obtener el correlativo del Documento";
            }
        }).then((registroEncontrado: any) => {
            if (registroEncontrado)
                return personaSequelize.findByPk(documento.IdDocumentoEmisor);
            else {
                let response = {
                    message: "Error",
                    content: "No existe el Expediente con Id=" + documento.IdExpediente
                };
                res.status(500).send(response);
                throw ("No existe el Expediente con Id=" + documento.IdExpediente);
            }
        }).then((registroEncontrado: any) => {
            if (registroEncontrado)
                return tipoDocumentoSequelize.findByPk(documento.IdTipoDocumento);
            else {
                let response = {
                    message: "Error",
                    content: "No existe la Persona (emisor) con Id=" + documento.IdDocumentoEmisor
                };
                res.status(500).send(response);
                throw ("No existe la Persona (emisor) con Id=" + documento.IdDocumentoEmisor);
            }
        }).then((registroEncontrado: any) => {
            if (registroEncontrado)
                return documento.save();
            else {
                let response = {
                    message: "Error",
                    content: "No existe el Tipo de Documento con Id=" + documento.IdDocumentoEmisor
                };
                res.status(500).send(response);
                throw ("No existe el Tipo de Documento con Id=" + documento.IdDocumentoEmisor);
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
        documentoSequelize.update(req.body,
            {
                where: {
                    Id: req.body.Id
                }
            }).then((respuesta: any) => {
                if (respuesta[0] === 1) {
                    documentoController.findById(req, res);
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
        documentoSequelize.update(
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
        documentoSequelize.findByPk(req.params.Id).then((registroEncontrado: any) => {
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
            throw `${error}`
        });
    }

}