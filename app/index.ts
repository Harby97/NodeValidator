import 'reflect-metadata';
import * as validator from '../app/middleware/index.middleware';
import * as docVal from '../app/middleware/document.middleware';
import bodyParser from 'body-parser';
import express from "express";

const app: any = express();
app.use(bodyParser.json());
const indexValidator = new validator.IndexMiddleware();
const documentValidator = new docVal.DocumentMiddleware();


app.post("/api/create", indexValidator.indexValidator);
app.post("/api/document", documentValidator.documentValidator);
app.listen(3000, () => {
    console.log("Escuchando en el puerto 3000 ");
});