export const getOptions = (input: HTMLSelectElement): EasyAdminFields.DependentfieldOptions => {
    const data = input.getAttribute('data-dependent-field-options')

    if (!data) {
        return {
            callback_url: "",
            dependencies: [],
            fetch_on_init: false
        };
    }

    return JSON.parse(data);
}

export const getCallbackUrl = (input: HTMLSelectElement): string => {
    const data = input.getAttribute('data-dependent-field-callback-url')

    return data;
}
