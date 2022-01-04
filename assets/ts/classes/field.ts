export default abstract class Field {
    protected field: Element;

    constructor(formGroupElement: Element) {
        this.field = formGroupElement;
    }

    getAttribute = (key: string) => {
        const fieldElement = this.field.querySelector('.form-widget > *')

        return fieldElement.getAttribute('data-eaf-' + key)
    }

    getValue = (): string | string[] => {
        return this.field.querySelector('input').value
    }
}
