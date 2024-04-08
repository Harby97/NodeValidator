import 'reflect-metadata';
import { IndexNameDTO } from "../app/dto/index/indexName.dto";
import { FilterTypeDTO } from "../app/dto/index/filterType.dto";
import { IndexDTO } from "../app/dto/index/create/index.dto";
import { DocumentDTO } from "../app/dto/document.dto";
import { QueryDTO } from "../app/dto/index/query/query.dto";
import * as ValidatorMiddleware from '../app/middleware/validator.middleware';
import bodyParser from 'body-parser';
import express from "express";

const app: any = express();
app.use(bodyParser.json());
const validator = new ValidatorMiddleware.ValidatorMiddleware();
const indexNameDTO = IndexNameDTO;
const filterTypeDTO = FilterTypeDTO;
const indexDTO = IndexDTO;
const queryDTO = QueryDTO;
const documentDTO = DocumentDTO;


app.post("/api/create", (req, res, next) => {
    validator.ValidateParams(req, res, filterTypeDTO, next)
}, (req, res, next) => {
    validator.ValidateBody(req, res, queryDTO, next)
});

app.post("/api/document", (req, res, next) => {
    validator.ValidateBody(req, res, documentDTO, next)
});
app.listen(3000, () => {
    console.log("Escuchando en el puerto 3000 ");
});