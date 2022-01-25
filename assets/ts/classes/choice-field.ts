import Field from "./field";
import TomSelect from "tom-select";

export default class ChoiceField extends Field {

    // protected control: TomSelect;
    //
    // constructor(field: Element) {
    //     super(field);
    //     // @ts-ignore
    //     this.control = this.field.querySelector('select').tomselect;
    // }


    isStandard = () => {
        return this.field.querySelector(".ts-wrapper.form-select") !== null;
    };

    isExpanded = () => {
        return this.field.querySelector(".form-check input") !== null;
    };

    isNative = () => {
        return !this.isExpanded() && !this.isStandard();
    };

    allowsMultipleChoices = () => {
        if (this.isExpanded()) {
            return this.field.querySelector('.form-check input[type=checkbox]') !== null;
        }

        if (this.isNative()) {
            return this.field.querySelector('select').getAttribute("multiple") !== null;
        }

        return this.field.querySelector(".form-select.multi") !== null;
    };

    getValue = () => {
        const checkboxes: NodeListOf<HTMLInputElement> = this.field.querySelectorAll('.form-check input[type="checkbox"]')

        if (checkboxes.length > 0) {
            return Array.from(checkboxes).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value)
        }

        const radios: NodeListOf<HTMLInputElement> = this.field.querySelectorAll('.form-check input[type="radio"]')

        if (radios.length > 0) {
            return Array.from(radios).find(radio => radio.checked)?.value
        }

        // Non circular reference way to get value from a form group
        const element: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement = this.field.querySelector('input, select, textarea')

        if (element instanceof HTMLSelectElement && element.multiple) {
            return Array.from(element.options).filter(option => option.selected).map(option => option.value)
        }

        return element.value;
    }

}
