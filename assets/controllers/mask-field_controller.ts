import {Controller} from '@hotwired/stimulus';
import {getFormGroupField, getValue, hideField, showField} from '../src/utils/field';
import {getMap, getMapElement, getMapFields} from '../src/utils/maskfield';

export default class extends Controller<HTMLInputElement> {
    private map: EasyAdminFields.Map;

    connect() {
        this.map = getMap(this.element);
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

        const mapElement = getMapElement(value, this.map);
        const fields = getMapFields(this.map);

        /*
        - hide every fields
        - show concerned fields again
         */

        // Hide every fields
        fields.forEach(hideField)

        if (mapElement) {
            // make corresponding fields visible
            mapElement.fields.forEach(showField)
        }
    }
}
