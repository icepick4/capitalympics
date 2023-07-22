export interface Country {
    id: number;
    code: string;
    name: string;
    capital: string;
    official_name: string;
    region_id: number;
    population: number;
    google_maps_link: string;
    flag: string;
}

export interface Continent {
    id: number;
    name: string;
}

export interface Region {
    id: number;
    name: string;
    continent_id: number;
}
