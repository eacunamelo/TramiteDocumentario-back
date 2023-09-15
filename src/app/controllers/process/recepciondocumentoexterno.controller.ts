import { Request, Response } from 'express';
import { expedienteSequelize, documentoSequelize, personaSequelize } from '../../config/sequelize';
const Sequelize = require('sequelize');
var fs = require('fs');

export var recepcionDocumentoExternoController = {
    receive: (req: Request, res: Response) => {
        let wrapResponse: any = [];
        let expediente = expedienteSequelize.build(req.body.expediente);
        let documento = documentoSequelize.build(req.body.documento);
        let tempPersonaCreada: any, tempExpedienteCreado: any;
        personaSequelize.findByPk(documento.IdPersona).then((personaEncontrada: any) => {
            if (personaEncontrada) {
                tempPersonaCreada = personaEncontrada;
                return expedienteSequelize.findOne({ attributes: [[Sequelize.fn('max', Sequelize.col('Codigo')), 'Codigo']] });
            }
            else {
                let response = {
                    message: "Error",
                    content: "No existe la Persona con el Id " + documento.IdPersona
                };
                res.status(500).send(response);
                throw "No existe la Persona con el Id " + documento.IdPersona;
            }
        }).then((expedienteEncontrado: any) => {
            if (expedienteEncontrado) {
                expediente.Codigo = expedienteEncontrado.dataValues.Codigo + 1;
                return expediente.save();
            }
            else {
                let response = {
                    message: "Error",
                    content: "No se pudo obtener el correlativo del Expediente"
                };
                res.status(500).send(response);
                throw "No se pudo obtener el correlativo del Expediente";
            }
        }).then((expedienteCreado: any) => {
            if (expedienteCreado) {
                tempExpedienteCreado = expedienteCreado;
                documento.IdExpediente = expedienteCreado.dataValues.Id;
                return documentoSequelize.findOne({ attributes: [[Sequelize.fn('max', Sequelize.col('Codigo')), 'Codigo']] })
            }
            else {
                let response = {
                    message: "Error",
                    content: "Al crear el expediente"
                };
                res.status(500).send(response);
                throw "Al crear el expediente";
            }
        }).then((documentoEncontrado: any) => {
            if (documentoEncontrado) {
                documento.Codigo = documentoEncontrado.dataValues.Codigo + 1;
                return documento.save();
            }
            else {
                let response = {
                    message: "Error",
                    content: "No se pudo obtener el correlativo del Documento"
                };
                res.status(500).send(response);
                throw "No se pudo obtener el correlativo del Documento";
            }
        }).then((documentoCreado: any) => {
            if (documentoCreado) {
                wrapResponse.push(tempExpedienteCreado);
                wrapResponse.push(documentoCreado);
                wrapResponse.push(tempPersonaCreada);
                let response = {
                    message: "Ok",
                    content: wrapResponse
                };
                res.status(200).send(response);
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
    uploadFile: (req: any, res: Response) => {
        try {
            if (req.files) {
                let path = req.files.ArchivoRuta.path;
                let pathSplit = path.split("\\");
                let nombreArcivo = pathSplit[pathSplit.length - 1];
                let extensionSplit = nombreArcivo.split(".");
                let extension = extensionSplit[extensionSplit.length - 1];
                if (extension.toLowerCase() == "doc" || extension.toLowerCase() == "docx" || extension.toLowerCase() == "pdf" ||
                    extension.toLowerCase() == "jpg" || extension.toLowerCase() == "jpeg" || extension.toLowerCase() == "png") {
                    let response = {
                        message: "Ok",
                        content: path
                    };
                    res.status(200).send(response);
                }
                else {
                    fs.unlink(path, (error: any) => {
                        if (error) {
                            let response = {
                                message: "Error",
                                content: "No es un archivo válido: Error al borrar el archivo - " + path
                            };
                            res.status(500).send(response);
                        }
                        else {
                            let response = {
                                message: "Error",
                                content: "No es un archivo válido: Archivo borrado"
                            };
                            res.status(500).send(response);
                        }
                    });
                }
            }
            else {
                console.log({
                    message: "Error",
                    content: "No tiene archivos"
                });
            }
        } catch (error) {
            let response = {
                message: "Error",
                content: `${error}`
            };
            res.status(500).send(response);
            throw `${error}`;
        }
    },
    deleteFile: (req: Request, res: Response) => {
        try {
            console.log(req.body);
            let path = req.body.ArchivoRuta;
            fs.unlink(path, (error: any) => {
                if (error) {
                    let response = {
                        message: "Error",
                        content: "Error al borrar el archivo: " + path
                    };
                    res.status(500).send(response);
                }
                else {
                    let response = {
                        message: "Ok",
                        content: "Archivo borrado"
                    };
                    res.status(200).send(response);
                }
            });
        } catch (error) {
            let response = {
                message: "Error",
                content: `${error}`
            };
            res.status(500).send(response);
            throw `${error}`;
        }
    }

}