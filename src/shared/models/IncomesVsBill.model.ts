import { InformationOfGraphic } from "./InformationOfGraphic.model"

export class IncomesVsBill {
    name: string;
    series: InformationOfGraphic[];

    constructor(name: string, series: InformationOfGraphic[]) {
        this.name = name;
        this.series = series
    }
}