import {TomInput} from "tom-select/src/types/core";

export const getValue = (input: HTMLInputElement | TomInput): string | string[] => {
    if (isTomSelect(input)) {
        return input.tomselect.getValue()
    }

    if (input.getAttribute('type') === 'checkbox') {
        // we want to return a string value
        return input.checked ? "true" : "false";
    }

    return input.value;
}

export const isTomSelect = (element: HTMLSelectElement | TomInput): element is TomInput => {
    return (element as TomInput).tomselect !== undefined;
}

export const getFieldFormGroup = (field: string): HTMLElement => {
    // find corresponding input
    const input: HTMLElement = document.querySelector(`[name*="[${field}]"]`);

    if (!input) {
        return null;
    }

    return getInputClosestFormGroup(input);
}

export const getFieldFormGroups = (field: string): HTMLElement[] => {
    // find corresponding inputs
    const inputs: NodeListOf<HTMLElement> = document.querySelectorAll(`[name*="[${field}]"]`);

    return [...inputs].map(getInputClosestFormGroup);
}

export const getFormGroupField = (formGroup: HTMLElement): HTMLInputElement => {
    return formGroup.querySelector('select, input, textarea');
}

export const hideField = (field: string) => {
    const formGroups: HTMLElement[] = getFieldFormGroups(field);

    formGroups.forEach(formGroup => {
        formGroup.style.display = "none";
    })
}

export const showField = (field: string) => {
    const formGroups: HTMLElement[] = getFieldFormGroups(field);

    formGroups.forEach(formGroup => {
        formGroup.style.display = null;
    })
}

export const getInputClosestFormGroup = (input: HTMLElement): HTMLElement => {
    return input.closest('.js-form-group-override') || input.closest('.form-group');
}
