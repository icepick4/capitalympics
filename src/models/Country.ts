export interface CountryI {
    name: string;
    official_name: string;
    capital: string;
    region: string;
    subregion: string;
    population: number;
    google_maps_link: string;
    flag: string;
    alpha3Code: string;
    currencies: Currency[];
}

export interface Currency {
    name: string;
    symbol: string;
}
