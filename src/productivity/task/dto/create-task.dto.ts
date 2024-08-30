import { Transform } from "class-transformer";
import { IsDateString, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { CategoryTask } from "src/productivity/category-task/entities/category-task.entity";
import { List } from "src/productivity/list/entities/list.entity";

export class CreateTaskDto {
    @Transform(({ value }) => value.trim())
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsOptional()
    @IsInt()
    owner?: number;

    @IsOptional()
    @IsInt()
    assigned?: number;

    @IsOptional()
    @IsDateString()
    duedate?: Date;

    @IsOptional()
    @IsString()
    note?: string;

    @IsOptional()
    list?: List;

    @IsOptional()
    categories?: CategoryTask[];
}
