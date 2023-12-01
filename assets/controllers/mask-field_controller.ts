import {Controller} from '@hotwired/stimulus';
import {getFormGroupField, getValue, hideField, showField} from '../src/utils/field';
import {getMapElement, getMapElements, getMapFields} from '../src/utils/maskfield';
import {keepArrayIntersections, removeDuplicates} from "../src/utils/array";

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

        const toHide = this.retrieveTargetedFields();
        const toShow = this.retrieveVisibleFields(value);

        this.handleFieldsVisibility(toHide, toShow)
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

    retrieveVisibleFields(value: string | string[]): string[] {
        if (!Array.isArray(value)) {
            return getMapElement(value, this.optionsValue.map).fields;
        }

        const mapElements = getMapElements(value, this.optionsValue.map);

        if (this.optionsValue.multipleSelectMode === "merge") {
            const fields = mapElements.map(mapElement => mapElement.fields).flat();
            return removeDuplicates(fields);
        }

        const fieldGroups = mapElements.map(mapElement => mapElement.fields);

        return keepArrayIntersections(fieldGroups);
    }

    retrieveTargetedFields(): string[] {
        return getMapFields(this.optionsValue.map);
    }
}
