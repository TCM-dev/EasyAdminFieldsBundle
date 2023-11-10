export const getMap = (input: HTMLInputElement): EasyAdminFields.Map => {
    const map = getOptions(input).map
    // const identifier_type = getOptions(input).identifier_type;
console.log(getOptions(input))
    return map;


    // const data = input.getAttribute('data-mask-field-map')
    //
    // if (!data) {
    //     return [];
    // }
    //
    // return JSON.parse(data);
}

export const getOptions = (input: HTMLInputElement): EasyAdminFields.MaskFieldOptions => {
    const data = input.getAttribute('data-mask-field-options')

    if (!data) {
        return {map: [], identifier_type: 'value'};
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
