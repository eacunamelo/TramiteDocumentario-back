import express from 'express';
import http from 'http';
import socketIO from 'socket.io';
import bodyParser = require('body-parser');

export default class Server {
    public app: express.Application;
    public puerto: any;
    public httpServer: http.Server;
    public io: socketIO.Server;

    constructor() {
        this.app = express();
        this.httpServer = new http.Server(this.app);
        this.io = socketIO(this.httpServer);
        this.configurarBodyParser();
        this.configurarCabecerasCords();
        this.puerto = process.env.PORT || 3700;
    }

    iniciar() {
        this.httpServer.listen(this.puerto, () => {
            console.log("\n*--------------------*\n| Servidor corriendo | -=>>  localhost:" + this.puerto + "\n*--------------------*      \\______________/\n");
        });
    }

    configurarCabecerasCords() {
        this.app.use((req: any, res: any, next: any) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
            res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
            next();
        });
    }
    configurarBodyParser() {
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
    }
}