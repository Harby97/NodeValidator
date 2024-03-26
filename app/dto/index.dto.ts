import { IsDefined, IsNotEmptyObject, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { IsInt, IsLowercase, IsNotEmpty, IsString, Matches, MaxLength } from 'class-validator';

class settingsDto {
    @IsInt({ message: 'number_of_shards debe ser un numero' })
    @IsNotEmpty({ message: 'number_of_shards es obligatorio' })
    number_of_shards!: number;
}

class mappingDto {
    @IsInt({ message: 'number_of_shards debe ser un numero' })
    @IsNotEmpty({ message: 'number_of_shards es obligatorio' })
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

    @ValidateNested({ message: 'settings debe ser un objeto' })
    @IsDefined({ message: 'settings es obligatorio' })
    @Type(() => settingsDto)
    settings!: settingsDto;

    @ValidateNested({ message: 'mapping debe ser un objeto' })
    @IsDefined({ message: 'mapping es obligatorio' })
    @Type(() => mappingDto)
    mapping!: mappingDto;
}