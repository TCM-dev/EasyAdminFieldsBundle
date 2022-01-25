import ChoiceField from "../classes/choice-field";
import {findFieldFormGroup, getValueFromFormGroup} from "../utils/helpers";
import axios from 'axios'
import TomSelect from "tom-select";
import {TomOption} from "tom-select/dist/types/types";
import {addFormListener} from "../utils/listeners";
import {Action} from "../types/easyadmin";

const createDependentFields = () => {
    // Find every concerned fields
    const fields = document.querySelectorAll(".field-dependent.field-select, .field-dependent.field-association");

    // Handle every fields
    fields.forEach((field) => {
        const dependantField = new DependentField(field);

        dependantField.init()
    });
}

class DependentField extends ChoiceField {

    init = async () => {
        const fields = this.getDependencies()

        fields.forEach(field => {
            const formGroup = findFieldFormGroup(field)
            formGroup.removeEventListener("input", this.handleDependenceChange);
            formGroup.addEventListener("input", this.handleDependenceChange);
        })

        const data = await this.getData()
        this.setOptions(data)
    }

    getDependencies = () => {
        const dependencies: string[] = this.getJSONAttribute('dependencies');

        return dependencies;
    }

    handleDependenceChange = async () => {
        const data = await this.getData()
        this.clear()
        this.setOptions(data)
    }

    getData = async () => {
        const fields = this.getDependencies()
        const params: any = {}

        fields.forEach(field => {
            const formGroup = findFieldFormGroup(field)
            params[field] = getValueFromFormGroup(formGroup);
        })

        return await this.fetchData(params)
    }

    clear = () => {
        // won't work with native or expanded input
        // @ts-ignore
        const control: TomSelect = this.field.querySelector('select').tomselect;
        control.clear()
    }

    setOptions = (data: TomOption[]) => {
        // won't work with native or expanded input
        // @ts-ignore
        const control: TomSelect = this.field.querySelector('select').tomselect;
        control.clearOptions()
        control.addOptions(data)
        control.settings.maxOptions = data.length
    }

    fetchData = async (params: any) => {
        const url = this.getAttribute('callback-url');

        let data: TomOption[] = [];

        await axios(url, {
            params
        })
            .then(response => data = response.data)
            .catch(error => console.log(error))

        return data;
    }

}

addFormListener(createDependentFields, [Action.EDIT, Action.NEW]);