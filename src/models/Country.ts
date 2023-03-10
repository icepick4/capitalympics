export class CountryObject {
    name: string;
    capital: string;
    region: string;
    population: number;
    flag: string;
    alpha3Code: string;
    currencies: Currency[];
    constructor(
        name: string,
        capital: string,
        region: string,
        population: number,
        flag: string,
        alpha3Code: string,
        currencies: Currency[]
    ) {
        this.name = name;
        this.capital = capital;
        this.region = region;
        this.population = population;
        this.flag = flag;
        this.alpha3Code = alpha3Code;
        this.currencies = currencies;
    }
}

export class Currency {
    name: string;
    symbol: string;
    constructor(name: string, symbol: string) {
        this.name = name;
        this.symbol = symbol;
    }
}
