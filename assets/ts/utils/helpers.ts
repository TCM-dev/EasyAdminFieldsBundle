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

export const isCreatePage = () => {
    // This may need to be improved to check based on parent form instead of body

    return document.body.classList.contains('ea-new');
}

export const isEditPage = () => {
    // This may need to be improved to check based on parent form instead of body

    return document.body.classList.contains('ea-edit');
}

export const isDetailPage = () => {
    // This may need to be improved to check based on parent form instead of body

    return document.body.classList.contains('ea-detail');
}

export const isFormPage = () => {
    // This may need to be improved to check based on parent form instead of body

    return isCreatePage() || isEditPage();
}