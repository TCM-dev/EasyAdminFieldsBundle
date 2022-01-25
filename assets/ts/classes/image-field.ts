import Field from "./field";

export default class ImageField extends Field {

    getValue = () => {
        const label = this.field.querySelector("label");

        return label.innerText;
    };

    getFile = () => {
        const input = this.field.querySelector("input");

        return input.files[0];
    }
}
