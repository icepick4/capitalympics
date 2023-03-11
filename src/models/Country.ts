export class CountryObject {
    name: string;
    officialName: string;
    capital: string;
    region: string;
    subregion: string;
    population: string;
    googleMapsLink: string;
    flag: string;
    alpha3Code: string;
    currencies: Currency[];
    constructor(
        name: string,
        officialName: string,
        capital: string,
        region: string,
        subregion: string,
        population: string,
        googleMapsLink: string,
        flag: string,
        alpha3Code: string,
        currencies: Currency[]
    ) {
        this.name = name;
        this.officialName = officialName;
        this.capital = capital;
        this.region = region;
        this.subregion = subregion;
        this.population = population;
        this.googleMapsLink = googleMapsLink;
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
