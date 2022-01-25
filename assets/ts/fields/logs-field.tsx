import React from "react";
import ReactDOM from "react-dom";

import ChoiceField from "../classes/choice-field";
import {addFormListener} from "../utils/listeners";
import {Action} from "../types/easyadmin";
import Logs from "../components/Logs";

const createLogFields = () => {
    // Find every concerned fields
    const fields = document.querySelectorAll(".field-logs");

    // Handle every fields
    fields.forEach((field) => {
        const logField = new LogField(field);

        logField.init()
    });
}

class LogField extends ChoiceField {

    init = () => {
        const logs = this.getJSONAttribute('logs')
        // console.log(logs)
        ReactDOM.render(
            <Logs logs={logs}/>
            , this.field);
    }

}

addFormListener(createLogFields, [Action.DETAIL]);

