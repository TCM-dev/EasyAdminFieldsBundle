export const getValue = (input: HTMLInputElement): string => {
    if (input.getAttribute('type') === 'checkbox') {
        // we want to return a string value
        return input.checked ? "true" : "false";
    }

    return input.value;
}

export const getFieldFormGroup = (field: string): HTMLElement => {
    // find corresponding input
    const input: HTMLElement = document.querySelector(`[name*="[${field}]"]`);

    if(!input) {
        return null;
    }

    return input.closest('.form-group');
}

export const getFormGroupField = (formGroup: HTMLElement): HTMLInputElement => {
    return formGroup.querySelector('select, input, textarea');
}

export const hideField = (field: string) => {
    const formGroup: HTMLElement = getFieldFormGroup(field);

    if(!formGroup) {
        return;
    }

    formGroup.style.display = "none";
}

export const showField = (field: string) => {
    const formGroup: HTMLElement = getFieldFormGroup(field);

    if(!formGroup) {
        return;
    }

    formGroup.style.display = null;
}