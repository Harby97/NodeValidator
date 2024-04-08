import { IsDefined, IsIn, IsNotEmpty } from 'class-validator';

export class FilterTypeDTO {
    @IsIn(["sql", "dsl"], { message: 'El campo debe ser sql o dsl' })
    @IsNotEmpty({ message: 'Field no puede estar vacio' })
    @IsDefined({ message: 'filterType es obligatorio como query param' })
    filterType!: string;
}