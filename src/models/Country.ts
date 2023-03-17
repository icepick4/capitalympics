export interface CountryI {
    name: string;
    official_name: string;
    capital: string;
    region: string;
    subregion: string;
    population: string;
    google_maps_link: string;
    flag: string;
    alpha3Code: string;
    currencies: Currency[];
}

export interface Currency {
    currency_name: string;
    symbol: string;
}
