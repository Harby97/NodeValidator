import { NextFunction, Request, Response } from "express";
import { IndexDTO } from "../dto/index.dto";
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";

export class IndexMiddleware {

    async indexValidator(req: Request, res: Response, next: NextFunction) {
        try {
            const exampleDto = plainToClass(IndexDTO, req.body);

            const dtoErrors = await validate(exampleDto, { skipMissingProperties: true });
            console.log(dtoErrors)

            if (dtoErrors.length > 0) {
                const errors = dtoErrors.map(error => {
                    if (error.constraints) {
                        return Object.values(error.constraints);
                    } else {
                        return ["Error de validación"];
                    }
                }).flat();
                return res.status(400).json({ errors });
            }

            next();
        } catch (error) {
            console.error('Error en la validación:', error);
            return res.status(500).json({ message: 'Error en la validación' });
        }
    }
}