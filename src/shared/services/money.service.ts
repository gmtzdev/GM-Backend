import { Injectable } from "@nestjs/common";

@Injectable()
export class MoneyService {
    public toFixed(amount: number, fractionDigits: number = 2): number {
        return (amount % 1 === 0) ? amount : +(amount.toFixed(fractionDigits));
    }
}