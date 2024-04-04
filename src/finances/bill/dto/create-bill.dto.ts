import { Card } from "src/finances/card/entities/card.entity";
import { Category } from "src/finances/category/entities/category.entity";
import { Institution } from "src/finances/institution/entities/institution.entity";
import { Payment } from "src/finances/payment/entities/payment.entity";

export class CreateBillDto {
    id: number;
    concept: string;
    amount: number;
    visible: boolean;
    created_at: Date;
    updated_at: Date;
    category: Category;
    payment: Payment;
    card: Card;
    institution: Institution;
}
