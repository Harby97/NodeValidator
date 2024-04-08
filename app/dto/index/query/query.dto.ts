import { Type } from 'class-transformer';
import { IsArray, IsDefined, IsNotEmpty, IsString, Matches, ValidateNested } from 'class-validator';

class FilterDTO {
    @IsString({ message: 'Field debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'Field no puede estar vacio' })
    @IsDefined({ message: 'field es obligatorio' })
    @Matches(/^(?!.*\b(?:\*|or|and)\b).+$/, { message: 'Field no puede contener "*", "or" o "and"' })
    field!: string;

    @IsString({ message: 'Value debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'Value no puede estar vacio' })
    @IsDefined({ message: 'value es obligatorio' })
    value!: string;

    @IsString({ message: 'Type debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'Type no puede estar vacio' })
    @IsDefined({ message: 'type es obligatorio' })
    @Matches(/^(<|>|=)$/, { message: 'Type solo puede ser <, > o ='})
    type!: string;
}

export class QueryDTO {
    @IsArray({ message: 'Fields debe ser un array' })
    @IsNotEmpty({ message: 'Fields no puede estar vacio' })
    @IsDefined({ message: 'fields es obligatorio' })
    @Matches(/^(?!.*\b(?:\*|or|and)\b).*$/, { each: true, message: 'Los elementos de Fields no pueden contener "*", "or" o "and"' })
    fields!: string[];

    @ValidateNested()
    @IsNotEmpty({ message: 'Filters no puede estar vacio' })
    @IsDefined({ message: 'filters es obligatorio' })
    @Type(() => FilterDTO)
    filters!: FilterDTO;
}
