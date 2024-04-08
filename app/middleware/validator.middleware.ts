import { NextFunction, Request, Response } from "express";
import { validate, ValidationError } from "class-validator";

export class ValidatorMiddleware {

    async ValidateProcess(req: Request, res: Response, dto: any, next: NextFunction) {
        try {
            const dtoErrors = await validate(dto, { skipMissingProperties: true });
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
            Object.assign(dto, req.body);
            this.ValidateProcess(req, res, dto, next);

        } catch (error) {
            return res.status(500).json({ message: 'Error en la validación' });
        }
    }

    async ValidateParams(req: Request, res: Response, dto: any, next: NextFunction) {
        try {
            Object.assign(dto, req.query);
            this.ValidateProcess(req, res, dto, next);

        } catch (error) {
            return res.status(500).json({ message: 'Error en la validación' });
        }

    }

}