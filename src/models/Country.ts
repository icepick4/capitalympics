
export interface CountryI {
    id: number;
    name: string;
    official_name: string;
    capital: string;
    region: RegionI;
    population: number;
    google_maps_link: string;
    flag: string;
    code: string;
    currencies: Currency[];
}

export interface RegionI {
    id: number;
    name: string;
    continent: ContinentI;
}

export interface ContinentI {
    id: number;
    name: string;
}

export interface Currency {
    name: string;
    symbol: string;
}
