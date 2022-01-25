import {getPageAction} from "./helpers";
import {Action} from "../types/easyadmin";

export const addFormListener = (listener: () => void, actions: Action[] = []) => {
    document.addEventListener("DOMContentLoaded", () => {
        if (actions.length > 0) {
            const action = getPageAction()

            if (!actions.includes(action)) {
                return
            }
        }

        listener()

        // Add events to new items added in collection field
        document.addEventListener('ea.collection.item-added', () => listener());
    });
}
