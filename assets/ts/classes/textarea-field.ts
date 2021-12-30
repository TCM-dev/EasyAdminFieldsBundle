import Field from "./field";

export default class TextareaField extends Field {

    getValue = () => {
        return this.field.querySelector('textarea').value
    }
}
