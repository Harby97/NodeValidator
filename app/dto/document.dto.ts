import { IsDefined, IsNotEmptyObject, IsObject, ValidateNested } from 'class-validator';
import { IsOptional } from 'class-validator';
import { IsInt, IsLowercase, IsNotEmpty, IsString, Matches, MaxLength } from 'class-validator';


export class DocumentDTO {
    @IsString({ message: 'el nombre del indice debe ser letras' })
    @IsLowercase({ message: 'el nombre del indice debe estar en minúsculas' })
    @Matches(/^(?![-_+])(?!.*\.\.?$)[^\\\/*?"<>|,`#]+$/, {
        message: 'El nombre no puede incluir \\, /, *, ?, ", <, >, |, `, ,, # y no puede empezar con -, _, +, ni ser . o ..',
    })
    @MaxLength(250, { message: 'El nombre no puede tener más de 250 caracteres' })
    @IsNotEmpty({ message: 'el nombre del indice es obligatorio' })
    @IsDefined({ message: 'el nombre del indice es obligatorio' })
    indexName!: string;
    
    @IsString({ message: 'el id es debe ser un string' })
    @IsNotEmpty({ message: 'el id no puede ir vacio' })
    @IsOptional({ message: 'el id es opcional' })
    id!: string;

    @IsObject({ message: 'body debe ser un objeto' })
    @IsNotEmpty({ message: 'el body no puede ir vacio' })
    @IsDefined({ message: 'body es obligatorio' })
    body!: object;
}