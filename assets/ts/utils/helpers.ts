import Field from "../classes/field";

export const getValueFromFormGroup = (formGroup: Element) => {
    const checkboxes: NodeListOf<HTMLInputElement> = formGroup.querySelectorAll('.form-check input[type="checkbox"]')

    if (checkboxes.length > 0) {
        return Array.from(checkboxes).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value)
    }

    const radios: NodeListOf<HTMLInputElement> = formGroup.querySelectorAll('.form-check input[type="radio"]')

    if (radios.length > 0) {
        return Array.from(radios).find(radio => radio.checked)?.value
    }

    // Non circular reference way to get value from a form group
    const element: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement = formGroup.querySelector('input, select, textarea')

    if (element instanceof HTMLSelectElement && element.multiple) {
        return Array.from(element.options).filter(option => option.selected).map(option => option.value)
    }

    return element.value;
}

export const findFieldFormGroup = (propertyName: string) => {
    const element = document.querySelector(`[name*="[${propertyName}]"]`);

    return element.closest('.form-group');
}

export const findCustomValue = (field: Field, key: string) => {
    const element = document.querySelector(`[data-uniq-id="${field.getUniqID()}"][data-key="${key}"]`)

    if (!element) {
        return null;
    }

    return element.getAttribute('data-value');
}