import * as basicLightbox from "basiclightbox";
import { v4 as uuidv4 } from "uuid";

document.addEventListener("DOMContentLoaded", () => {
  // Find every concerned fields
  const fields = document.querySelectorAll(".field-image-preview.form-group");

  // Handle every fields once and listen for change event to handle them
  fields.forEach((field) => {
    const imagePreviewField = new ImagePreviewField(field);
    field.addEventListener("change", () => imagePreviewField.handle());
    imagePreviewField.handle();
  });
});

const handleLightboxClick = (event: MouseEvent, anchor: HTMLAnchorElement) => {
  event.preventDefault();

  const lightboxContent = document.querySelector(
    anchor.getAttribute("data-eaf-lightbox-content-selector")
  ).innerHTML;

  const lightbox = basicLightbox.create(lightboxContent);
  lightbox.show();
};

class ImagePreviewField {
  field: Element;
  image: HTMLImageElement;
  imageThumbnail: HTMLImageElement;
  lightbox: HTMLDivElement;
  lightboxThumbnail: HTMLAnchorElement;

  constructor(field: Element) {
    this.field = field;
  }

  buildView = () => {
    const UID = this.field.classList[2].substring(10);

    // Lightbox Thumbnail
    this.lightboxThumbnail = document.createElement("a");
    this.lightboxThumbnail.classList.add("eaf-lightbox-thumbnail");
    this.lightboxThumbnail.href = "#";
    this.lightboxThumbnail.setAttribute(
      "data-eaf-lightbox-content-selector",
      "#eaf-lightbox-" + UID
    );

    // Lightbox Thumbnail image
    this.imageThumbnail = document.createElement("img");
    this.imageThumbnail.classList.add("img-fluid");

    // Combine and append to field
    this.lightboxThumbnail.appendChild(this.imageThumbnail);
    this.field.appendChild(this.lightboxThumbnail);

    // Lightbox
    this.lightbox = document.createElement("div");
    this.lightbox.classList.add("eaf-lightbox");
    this.lightbox.id = "eaf-lightbox-" + UID;

    // Lightbox image
    this.image = document.createElement("img");

    // Combine and append to field
    this.lightbox.appendChild(this.image);
    this.field.appendChild(this.lightbox);

    this.lightboxThumbnail.addEventListener("click", (e) =>
      handleLightboxClick(e, this.lightboxThumbnail)
    );
  };

  removeView = () => {
    if (this.lightboxThumbnail) {
      this.lightboxThumbnail.remove();
      this.lightboxThumbnail.removeEventListener("click", (e) =>
        handleLightboxClick(e, this.lightboxThumbnail)
      );
    }

    if (this.lightbox) {
      this.lightbox.remove();
    }
  };

  getInitialValue = () => {
    const input = this.field.querySelector("input");

    return input.placeholder;
  };

  getFile = () => {
    const input = this.field.querySelector("input");

    return input.files[0];
  };

  handle = () => {
    const file = this.getFile();
    const value = this.getInitialValue();
    const UID = this.field.classList[2].substring(20);
    let basePath = document
      .querySelector(".field-image-preview-basePath-" + UID)
      .getAttribute("data-value");

    if (!basePath.endsWith("/")) {
      basePath += "/";
    }

    if (file) {
      this.removeView();
      this.buildView();
      this.image.src = URL.createObjectURL(file);
      this.imageThumbnail.src = URL.createObjectURL(file);
    } else if (value) {
      this.removeView();
      this.buildView();
      this.image.src = basePath + value;
      this.imageThumbnail.src = basePath + value;
    } else {
      if (this.image) {
        this.image.src = "";
      }

      if (this.imageThumbnail) {
        this.imageThumbnail.src = "";
      }

      this.removeView();
    }
  };
}
