import ChoiceField from "./classes/choice-field";
import {findFieldFormGroup, getValueFromFormGroup} from "./utils/helpers";
import axios from 'axios'
import TomSelect from "tom-select";
import {TomOption} from "tom-select/dist/types/types";
import TextareaField from "./classes/textarea-field";

document.addEventListener("DOMContentLoaded", () => {
    // Find every concerned fields
    const fields = document.querySelectorAll(".field-dependent.field-select");

    // Handle every fields once and listen for change event to handle them
    fields.forEach((field) => {
        const dependantField = new DependentField(field);

        dependantField.init()
    });
});


class DependentField extends ChoiceField {

    init = async () => {
        const field = this.getDependence()

        field.addEventListener("input", this.handleDependenceChange);
        await this.handleDependenceChange();
    }

    getDependence = () => {
        const propertyName = this.getCustomValue('propertyName');

        return findFieldFormGroup(propertyName);
    }

    handleDependenceChange = async () => {
        // @ts-ignore
        const control: TomSelect = this.field.querySelector('select').tomselect;

        const formGroup = this.getDependence()


        const value = getValueFromFormGroup(formGroup);
        const data = await this.fetchData(value)

        control.clearOptions()
        control.addOptions(data)
        control.settings.maxOptions = data.length
    }

    fetchData = async (value: any) => {
        const url = this.getCustomValue('url');

        let data: TomOption[] = [];

        await axios(url, {
            params: {
                value
            }
        })
            .then(response => data = response.data)
            .catch(error => console.log(error))

        return data;
    }

}
