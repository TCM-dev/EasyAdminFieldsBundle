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
        return "a";
        // return this.control.getValue()
    }

}
