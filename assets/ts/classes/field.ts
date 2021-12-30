import {findCustomValue} from "../utils/helpers";

export default abstract class Field {
    protected field: Element;

    constructor(formGroupElement: Element) {
        this.field = formGroupElement;
    }

    getUniqID = () => {
        return this.field.classList.item(2).substring(7);
    }

    getCustomValue = (key: string) => {
        return findCustomValue(this, key)
    }

    getValue = (): string | string[] => {
        return this.field.querySelector('input').value
    }
}
