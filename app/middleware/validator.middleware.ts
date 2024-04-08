import { NextFunction, Request, Response } from "express";
import { validate, ValidationError } from "class-validator";
import { plainToClass } from "class-transformer";

export class ValidatorMiddleware {

    async ValidateProcess(req: Request, res: Response, dto: any, next: NextFunction) {
        try {
            console.log(dto)
            const dtoErrors = await validate(dto, { skipMissingProperties: true });
            console.log(dtoErrors)
            if (dtoErrors.length > 0) {
                const errorMessages: string[] = [];
                dtoErrors.map(error => {
                    if (error.children && error.children.length !== undefined && error.children.length > 0) {
                        error.children.map(childError => {
                            errorMessages.push(JSON.stringify(childError.constraints));
                        });
                    } else if (error.constraints && error.constraints !== undefined) {
                        errorMessages.push(JSON.stringify(error.constraints));
                    }
                });
                return res.status(400).json({ ErrorValidacion: errorMessages });
            }

            next();
        } catch (error) {
            return res.status(500).json({ message: 'Error en la validación' });
        }
    }

    async ValidateBody(req: Request, res: Response, dto: any, next: NextFunction) {
        try {
            const validatedDto = plainToClass(dto, req.body); 
            this.ValidateProcess(req, res, validatedDto, next);

        } catch (error) {
            return res.status(500).json({ message: 'Error mapeando body' });
        }
    }

    async ValidateParams(req: Request, res: Response, dto: any, next: NextFunction) {
        try {
            const validatedDto = plainToClass(dto, req.query);
            this.ValidateProcess(req, res, validatedDto, next);

        } catch (error) {
            return res.status(500).json({ message: 'Error mapeando params' });
        }

    }

}