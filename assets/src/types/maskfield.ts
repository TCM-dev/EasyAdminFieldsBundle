export type MapElement = {
    value: any;
    fields: string[];
}

export type MaskFieldOptions = {
    map: Map;
    multipleSelectMode: "merge" | "intersect";
}

export type Map = MapElement[]
