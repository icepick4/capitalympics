export class CountryObject {
    name: string;
    capital: string;
    region: string;
    population: number;
    flag: string;
    alpha3Code: string;
    constructor(
        name: string,
        capital: string,
        region: string,
        population: number,
        flag: string,
        alpha3Code: string
    ) {
        this.name = name;
        this.capital = capital;
        this.region = region;
        this.population = population;
        this.flag = flag;
        this.alpha3Code = alpha3Code;
    }
}
