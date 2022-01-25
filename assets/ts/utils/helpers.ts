import {Action} from "../types/easyadmin";

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

export const getPageAction = () => {
    switch (true) {
        case document.body.classList.contains('ea-detail'):
            return Action.DETAIL
        case document.body.classList.contains('ea-new'):
            return Action.NEW
        case document.body.classList.contains('ea-edit'):
            return Action.EDIT
        case document.body.classList.contains('ea-index'):
            return Action.INDEX
        default:
            return null
    }
}

export const isCreatePage = () => {
    return getPageAction() === Action.NEW;
}

export const isEditPage = () => {
    return getPageAction() === Action.EDIT;
}

export const isDetailPage = () => {
    return getPageAction() === Action.DETAIL;
}

export const isIndexPage = () => {
    return getPageAction() === Action.INDEX;
}

export const isFormPage = () => {
    return isCreatePage() || isEditPage();
}