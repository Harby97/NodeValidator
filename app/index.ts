import 'reflect-metadata';
import { IndexNameDTO } from "../app/dto/index/indexName.dto";
import { DocumentDTO } from "../app/dto/document.dto";
import * as ValidatorMiddleware from '../app/middleware/validator.middleware';
import bodyParser from 'body-parser';
import express from "express";

const app: any = express();
app.use(bodyParser.json());
const validator = new ValidatorMiddleware.ValidatorMiddleware();
const indexNameDTO = new IndexNameDTO();
const documentDTO = new DocumentDTO();


app.post("/api/create",(req, res, next) => {
    validator.ValidateParams(req,res,indexNameDTO,next)
    });
app.post("/api/document",(req, res, next) => {
    validator.ValidateBody(req,res,documentDTO,next)
    });
app.listen(3000, () => {
    console.log("Escuchando en el puerto 3000 ");
});