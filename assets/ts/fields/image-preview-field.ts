import {addFormListener} from "../utils/listeners";
import {Action} from "../types/easyadmin";
import ImageField from "../classes/image-field";
import {v4 as uuidv4} from "uuid";
import * as basicLightbox from "basiclightbox";

const createImagePreviewField = () => {
    // Find every concerned fields
    const fields = document.querySelectorAll(".field-image.field-image-preview");

    // Handle every fields
    fields.forEach((field) => {
        const imagePreviewField = new ImagePreviewField(field);

        imagePreviewField.init()
    });
}

class ImagePreviewField extends ImageField {
    private uuid: string;

    constructor(props: Element) {
        super(props);

        this.uuid = uuidv4()
    }

    init = () => {
        this.field.addEventListener("change", this.handle);
        this.handle()
    }

    handle = () => {
        const src = this.getSrc()

        if (!src) {
            this.removeView();
            return
        }

        this.rebuildView();
    }

    getSrc = () => {
        const file = this.getFile();
        const value = this.getValue();

        if (file) {
            return URL.createObjectURL(file)
        }

        if (value && value.includes('.')) {
            let basePath = this.getAttribute('base-path')

            if (!basePath.endsWith("/")) {
                basePath += "/";
            }

            return basePath + value
        }

        return null;
    }

    handleLightboxClick = (event: MouseEvent) => {
        event.preventDefault();

        const lightboxContent = this.buildLightbox();

        const lightbox = basicLightbox.create(lightboxContent);
        lightbox.show();
    };


    buildLightboxAnchor = () => {
        // Lightbox Thumbnail image
        const img = document.createElement("img");
        img.classList.add("img-fluid");
        img.src = this.getSrc();

        // Lightbox Thumbnail
        const thumbnail = document.createElement("a");
        thumbnail.classList.add("eaf-lightbox-thumbnail");
        thumbnail.href = "#";
        thumbnail.appendChild(img);
        thumbnail.addEventListener("click", this.handleLightboxClick);

        return thumbnail;
    }

    buildLightbox = () => {
        // Lightbox
        const lightbox = document.createElement("div");

        // Lightbox image
        const img = document.createElement("img");
        img.src = this.getSrc();

        // Combine and append to field
        lightbox.appendChild(img);

        return lightbox;
    }

    buildView = () => {
        const anchor = this.buildLightboxAnchor()

        // Combine and append to field
        this.field.appendChild(anchor);
    };

    removeView = () => {
        const anchor = this.field.querySelector("a.eaf-lightbox-thumbnail");

        if (anchor) {
            anchor.remove()
        }
    };

    rebuildView = () => {
        this.removeView()
        this.buildView()
    }
}

addFormListener(createImagePreviewField, [Action.EDIT, Action.NEW]);

