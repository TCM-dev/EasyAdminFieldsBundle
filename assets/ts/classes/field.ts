import TomSelect from "tom-select";

export default class Field {
    protected field: Element;

    constructor(formGroupElement: Element) {
        this.field = formGroupElement;
    }

    getAttributesHolder = () => {
        if (this.field.classList.contains('data-row')) {
            return this.field.querySelector('.attributes-holder')
        }

        if (this.field.classList.contains('field-image')) {
            return this.field.querySelector('.form-widget input')
        }

        return this.field.querySelector('.form-widget > *')
    }

    getAttribute = (key: string) => {
        const attributesHolder = this.getAttributesHolder();

        return attributesHolder.getAttribute('data-eaf-' + key)
    }

    getJSONAttribute = (key: string) => {
        const attribute = this.getAttribute(key)

        return JSON.parse(attribute)
    }

    getValue = (): string | string[] => {
        return this.field.querySelector('input').value
    }

    show = () => {
        this.field.classList.remove("hide");
    }

    hide = (clearValue: boolean = false) => {
        this.field.classList.add("hide");

        if (clearValue) {
            const fieldInput: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
                = this.field.querySelector("input, textarea, select");

            // If it is a TomSelect input
            // @ts-ignore
            const control: TomSelect = this.field.querySelector('select')?.tomselect;
            if (control) {
                control.clear()
            }

            fieldInput.value = undefined;
        }
    }
}
