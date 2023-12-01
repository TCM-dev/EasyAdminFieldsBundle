

export const getOptions = (input: HTMLInputElement): EasyAdminFields.MaskFieldOptions => {
    const data = input.getAttribute('data-mask-field-options')

    if (!data) {
        return {map: [], multipleSelectMode: 'value'};
    }

    return JSON.parse(data);
}

export const getMapFields = (map: EasyAdminFields.Map): string[] => {
    const fields: string[] = [];

    map.forEach(mapElement => {
        const mapElementFields = mapElement.fields

        mapElementFields.forEach(field => {
            if (fields.includes(field)) {
                return;
            }

            fields.push(field);
        })
    })

    return fields;
}

export const getMapElement = (value: string, map: EasyAdminFields.Map): EasyAdminFields.MapElement | undefined => {
    return map.find(mapElement => mapElement.value == value);
}

export const getMapElements = (values: string[], map: EasyAdminFields.Map): EasyAdminFields.MapElement[] => {
    return map.filter(mapElement => values.includes(mapElement.value));
}
