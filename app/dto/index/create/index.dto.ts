import { IsDefined, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

class settingsDto {
    @IsInt({ message: 'number_of_shards debe ser un numero' })
    @IsNotEmpty({ message: 'number_of_shards es obligatorio' })
    number_of_shards!: number;
}

class mappingDto {
    @IsObject({ message: 'properties debe ser un objeto' })
    @IsNotEmpty({ message: 'el nombre del indice es obligatorio' })
    @IsDefined({ message: 'properties es obligatorio' })
    properties!: object;
}


export class IndexDTO {
    @ValidateNested({ message: 'settings debe ser un objeto' })
    @IsNotEmpty({ message: 'el nombre del indice es obligatorio' })
    @IsDefined({ message: 'settings es obligatorio' })
    @Type(() => settingsDto)
    settings!: settingsDto;

    @ValidateNested({ message: 'mapping debe ser un objeto' })
    @IsNotEmpty({ message: 'el nombre del indice es obligatorio' })
    @IsDefined({ message: 'mapping es obligatorio' })
    @Type(() => mappingDto)
    mapping!: mappingDto;
}