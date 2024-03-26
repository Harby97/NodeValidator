import { NextFunction, Request, Response } from "express";
import { DocumentDTO } from "../dto/document.dto";
import { validate, ValidationError } from "class-validator";
import { plainToClass } from "class-transformer";

export class DocumentMiddleware {

    async documentValidator(req: Request, res: Response, next: NextFunction) {
        try {
            const exampleDto = plainToClass(DocumentDTO, req.body);
            const dtoErrors = await validate(exampleDto, { skipMissingProperties: true });
     
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
    extractConstraints(dtoErrors: ValidationError[]) {
        throw new Error("Method not implemented.");
    }
}