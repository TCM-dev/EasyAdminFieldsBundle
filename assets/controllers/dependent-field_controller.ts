import {Controller} from '@hotwired/stimulus';
import {getFieldFormGroup, getFormGroupField, getValue, hideField, isTomSelect, showField} from '../src/utils/field';
import {getCallbackUrl, getOptions} from "../src/utils/dependentfield";
import {TomInput} from "tom-select/src/types/core";
import {DependentFieldSelectOption} from "../src/types";

export default class extends Controller<HTMLSelectElement> {
    private callbackUrl: string;
    private dependencies: string[];
    private dependenciesFormGroup: HTMLElement[] = [];
    private isTomselect: boolean;
    private input: TomInput | HTMLSelectElement;

    connect() {
        const options = getOptions(this.element);
        this.callbackUrl = options['callback_url'];

        this.dependencies = options['dependencies'];
        this.dependencies.forEach(dependency => {
            const formGroup = getFieldFormGroup(dependency);

            if (!formGroup) {
                return;
            }

            formGroup.addEventListener('input', this.handle.bind(this))
            this.dependenciesFormGroup.push(formGroup)
        })

        this.input = getFormGroupField(this.element);
        this.isTomselect = Boolean(this.element.querySelector('.tomselected'));

        if (options['fetch_on_init'] || false) {
            this.handle();
        }
    }

    disconnect() {
        this.dependenciesFormGroup.forEach(formGroup => {
            formGroup.removeEventListener('input', this.handle.bind(this))
        })
    }

    async handle() {
        const input = this.input as HTMLSelectElement;

        const hasEmptyOption = Boolean(Array.from(input.options).find(option => {
            return option.value === "";
        }));

        this.clearOptions()

        const newOptions = await this.fetchOptions()

        this.setOptions(newOptions, hasEmptyOption)
    }

    async fetchOptions(): Promise<EasyAdminFields.DependentFieldSelectOption[]> {
        const params = new URLSearchParams();

        this.dependencies.forEach(dependency => {
            const formGroup = getFieldFormGroup(dependency)

            if (!formGroup) {
                return;
            }

            const field = getFormGroupField(formGroup)
            const value = getValue(field)

            if (Array.isArray(value)) {
                value.forEach(singleValue => {
                    params.append(dependency + "[]", singleValue)
                })

                return;
            }

            params.append(dependency, value)
        })

        const queryParams = (new URLSearchParams(params)).toString()
        const response = await fetch(`${this.callbackUrl}?${queryParams}`)

        return await response.json()
    }

    clearOptions() {
        if (!isTomSelect(this.input)) {
            while (this.input.options.length > 0) {
                this.input.remove(0);
            }

            return;
        }

        const control = this.input.tomselect;
        control.lock();
        control.clear()
        control.clearOptions()
    }

    setOptions(options: EasyAdminFields.DependentFieldSelectOption[], hasEmptyOption: boolean) {
        // Using this.input directly won't work with loop context and typescript type guard
        const input = this.input

        if (!isTomSelect(input)) {
            if (hasEmptyOption) {
                input.options.add(new Option("", ""))
            }

            options.forEach(option => {
                input.options.add(new Option(option.text, option.value))
            })

            return;
        }

        const control = input.tomselect;
        control.addOptions(options)
        control.refreshOptions(false)
        control.unlock()
    }
}
