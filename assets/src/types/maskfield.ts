export type MapElement = {
    value: any;
    fields: string[];
}

export type MaskFieldOptions = {
    map: Map;
    identifier_type: string;
}

export type Map = MapElement[]