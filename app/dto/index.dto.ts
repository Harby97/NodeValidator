import { IsDefined, IsNotEmptyObject, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { IsInt, IsLowercase, IsNotEmpty, IsString, Matches, MaxLength } from 'class-validator';

export class IndexDTO {
    @IsString({ message: 'el nombre del indice debe ser letras' })
    @IsLowercase({ message: 'el nombre del indice debe estar en minúsculas' })
    @Matches(/^(?![-_+])(?!.*\.\.?$)[^\\\/*?"<>|,`#]+$/, {
        message: 'El nombre no puede incluir \\, /, *, ?, ", <, >, |, `, ,, # y no puede empezar con -, _, +, ni ser . o ..',
    })
    @MaxLength(250, { message: 'El nombre no puede tener más de 250 caracteres' })
    @IsNotEmpty({ message: 'el nombre es obligatorio' })
    indexName!: string;
}