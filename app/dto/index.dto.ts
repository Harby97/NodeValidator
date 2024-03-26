import { IsDefined, IsNotEmptyObject, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { IsInt, IsLowercase, IsNotEmpty, IsString, Matches, MaxLength } from 'class-validator';

class FieldPropertiesDto {
    @IsString({ message: 'el tipo de la propiedad debe ser una cadena de caracteres' })
    @IsNotEmpty()
    type!: string;
}

class PropertiesDto {
    @IsObject({ message: 'properties debe ser un objeto' })
    @ValidateNested()
    @Type(() => FieldPropertiesDto)
    properties!: {
        [key: string]: FieldPropertiesDto;
    };
}

class MappingsDto {
    @IsDefined({ message: 'mappings debe estar definido' })
    @IsObject({ message: 'mappings debe ser un objeto' })
    @ValidateNested()
    @Type(() => PropertiesDto)
    properties!: PropertiesDto;
}

export class SettingsDto {
    @IsInt({ message: 'number of shards debe ser una cadena de caracteres' })
    @IsOptional()
    number_of_shards!: number;
}

export class IndexDTO {
    @IsString({ message: 'el nombre del indice debe ser letras' })
    @IsLowercase({ message: 'el nombre del indice debe estar en minúsculas' })
    @Matches(/^(?![-_+])(?!.*\.\.?$)[^\\\/*?"<>|,`#]+$/, {
        message: 'El nombre no puede incluir \\, /, *, ?, ", <, >, |, `, ,, # y no puede empezar con -, _, +, ni ser . o ..',
    })
    @MaxLength(250, { message: 'El nombre no puede tener más de 250 caracteres' })
    @IsNotEmpty({ message: 'el nombre es obligatorio' })
    indexName!: string;

    @IsDefined({ message: 'settings debe estar definido' })
    @IsObject({ message: 'al configurar un indice con settings debes proporcionar un objeto de configuración' })
    @ValidateNested({ each: true })
    settings!: SettingsDto;

    @IsDefined()
    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => MappingsDto)
    mappings!: MappingsDto;
}