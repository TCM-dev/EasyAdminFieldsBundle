import {Controller} from '@hotwired/stimulus';
import {getFormGroupField, getValue, hideField, showField} from '../src/utils/field';
import {getMapElement, getMapElements, getMapFields} from '../src/utils/maskfield';
import {removeDuplicates} from "../src/utils/array";

export default class extends Controller<HTMLInputElement> {
    static values = {
        options: Object,
    };

    declare readonly optionsValue: EasyAdminFields.MaskFieldOptions

    connect() {
        this.element.addEventListener('input', this.handleEvent.bind(this))
        const input = getFormGroupField(this.element);
        this.handle(input);
    }

    disconnect() {
        this.element.removeEventListener('input', this.handleEvent.bind(this))
    }

    handleEvent(e: Event) {
        const input = e.target as HTMLInputElement;

        this.handle(input);
    }

    handle(input: HTMLInputElement) {
        const value = getValue(input);
        const mapFields = getMapFields(this.optionsValue.map);

        if (Array.isArray(value)) {
            const mapElements = getMapElements(value, this.optionsValue.map);
            const fields = mapElements.map(mapElement => mapElement.fields).flat();

            const finalFields = removeDuplicates(fields);

            this.handleFieldsVisibility(mapFields, finalFields)

            return;
        }

        const mapElement = getMapElement(value, this.optionsValue.map);

        this.handleFieldsVisibility(mapFields, mapElement?.fields)
    }

    /**
     - hide every field
     - show concerned fields again
     */
    handleFieldsVisibility(toHide: string[], toShow: string[]) {
        toHide.forEach(hideField)

        if (toShow) {
            // make corresponding fields visible
            toShow.forEach(showField)
        }
    }

}
