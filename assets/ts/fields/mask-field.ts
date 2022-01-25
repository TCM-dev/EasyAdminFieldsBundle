import ChoiceField from "../classes/choice-field";
import {addFormListener} from "../utils/listeners";
import {Action} from "../types/easyadmin";
import {findFieldFormGroup} from "../utils/helpers";
import Field from "../classes/field";

const createMaskFields = () => {
    // Find every concerned fields
    const fields = document.querySelectorAll(".field-mask.field-select");

    // Handle every fields
    fields.forEach((field) => {
        const maskField = new MaskField(field);

        maskField.init()
    });
}

type Map = {
    value: string;
    propertyNames: string[]
}

class MaskField extends ChoiceField {
    private map: Map[];

    init = () => {
        this.field.removeEventListener("change", this.handle)
        this.field.addEventListener("change", this.handle)
        this.map = this.getJSONAttribute('map');
        this.handle();
    }

    handle = () => {
        const propertyNames = this.getPropertyNames()
        const visiblePropertyNames = this.getVisiblePropertyNames()

        propertyNames.forEach(propertyName => {
            const formGroup = findFieldFormGroup(propertyName)
            const field = new Field(formGroup);

            if (visiblePropertyNames.includes(propertyName)) {
                field.show()
            } else {
                field.hide(true);
            }
        })
    }

    getVisiblePropertyNames = () => {
        const entryIndex = this.map.findIndex(entry => {
            return this.getValue() === entry.value
        })

        if (entryIndex === -1) {
            return [];
        }

        return this.map[entryIndex].propertyNames
    }

    getPropertyNames = () => {
        const propertyNames: string[] = []

        this.map.forEach(entry => {
            entry.propertyNames.forEach(propertyName => {
                if (!propertyNames.includes(propertyName)) {
                    propertyNames.push(propertyName)
                }
            })
        })

        return propertyNames
    }

}

addFormListener(createMaskFields, [Action.EDIT, Action.NEW]);

