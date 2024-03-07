import { applyDecorators } from "@nestjs/common";
import { ApiProperty, ApiPropertyOptional, ApiPropertyOptions } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsNotEmpty, IsOptional } from "class-validator";

export function DtoProperty(options?:ApiPropertyOptions,plainBehaviour?:'expose'|'exclude'){
    if(plainBehaviour==='exclude'){
        return applyDecorators(ApiProperty(options),Exclude(),IsNotEmpty())
    }
    return applyDecorators(ApiProperty(options),Expose(),IsNotEmpty())
}
export function DtoPropertyOptional(options?:ApiPropertyOptions,plainBehaviour?:'expose'|'exclude'){
    if(plainBehaviour==='exclude'){
        return applyDecorators(ApiPropertyOptional(options),Exclude(),IsOptional())
    }
    return applyDecorators(ApiPropertyOptional(options),Expose(),IsOptional())
}