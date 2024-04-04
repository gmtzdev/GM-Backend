export class InformationOfGraphic {
    name: string;
    value: number;
    extra?: any;

    constructor(name: string, value: number) {
        this.name = name;
        this.value = value;
    }
}