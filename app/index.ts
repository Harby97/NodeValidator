import * as validator from '../app/middleware/index.middleware';
import bodyParser from 'body-parser';
import express from "express";

const app: any = express();
app.use(bodyParser.json());
const indexValidator = new validator.IndexMiddleware();


app.post("/api/create", indexValidator.indexValidator);
app.listen(3000, () => {
    console.log("Escuchando en el puerto 3000 ");
});