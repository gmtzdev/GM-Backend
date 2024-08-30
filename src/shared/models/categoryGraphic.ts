export class CategoryGraphic {
    id: number;
    name: string;
    lastBillDate: Date;
    icon: string;
    value: number = 0;

    constructor(id: number, name: string, icon: string = 'ghost.svg') {
        this.id = id;
        this.name = name;
        this.icon = icon;
    }

    public addValue(amount: number) {
        this.value += amount;
    }

    public setLastBillDate(date: Date) {
        this.lastBillDate = date;
    }
}