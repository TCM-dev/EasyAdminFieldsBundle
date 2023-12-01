export type MapElement = {
    value: any;
    fields: string[];
}

export type MaskFieldOptions = {
    map: Map;
    multipleSelectMode: string;
}

export type Map = MapElement[]
