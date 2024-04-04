import { Origin } from "src/finances/origin/entities/origin.entity";

export class CreateIncomeDto {
    concept: string;
    amount: number;
    visible: boolean;
    created_at: Date;
    updated_at: Date;
    origin_id: number;
    origin: Origin
}
