document.addEventListener("DOMContentLoaded", () => {
  // Find every concerned maskfields
  const fields = document.querySelectorAll(".maskfield.form-group");

  // Handle every fields once and listen for change event to handle them
  fields.forEach((field) => {
    const maskfield = new Maskfield(field);
    field.addEventListener("change", () => maskfield.handle());

    maskfield.handle();
  });
});

class Maskfield {
  maskfield: Element;

  constructor(maskfield: Element) {
    this.maskfield = maskfield;
  }

  isSelect = () => {
    return this.maskfield.querySelector("select");
  };

  isRadio = () => {
    return this.maskfield.querySelector(".form-check input");
  };

  getValue = () => {
    // If expanded option is used
    if (this.isRadio()) {
      const radios: NodeListOf<HTMLInputElement> =
        this.maskfield.querySelectorAll(".form-check input");

      const checked = Array.from(radios).find(
        (radio) => radio.checked === true
      );

      if (!checked) {
        return "";
      }

      return checked.value;
    }

    if (this.isSelect()) {
      const item = this.maskfield.querySelector(".item");

      if (!item) {
        return "";
      }

      return item.getAttribute("data-value");
    }

    return "";
  };

  getMap = () => {
    const uniqID = this.maskfield.classList[2].substring(10);
    const mapElement = document.querySelector(".maskfield-map-" + uniqID);

    const map = [];

    for (const item of Array.from(mapElement.children)) {
      // Extract data and push it into map array
      map.push({
        key: item.getAttribute("data-key"),
        values: JSON.parse(item.getAttribute("data-values")),
      });
    }

    return map;
  };

  getUniqueFieldsName = () => {
    const fieldsName: string[] = [];
    const map = this.getMap();

    // Push every map values into fieldsName array
    map.forEach((mapObject) => fieldsName.push(...mapObject.values));

    // Remove duplicates
    return fieldsName.filter(
      (elem, index, self) => index === self.indexOf(elem)
    );
  };

  getMapFields = () => {
    const parentForm = this.maskfield.querySelector("input").form;

    const uniqueFieldsName = this.getUniqueFieldsName();

    // Map them into their corresponding dom field
    return uniqueFieldsName.map(
      (field) =>
        document
          .getElementById(parentForm.name + "_" + field)
          .closest(".form-group").parentElement
    );
  };

  handle = () => {
    const value = this.getValue();

    this.handleMapFields(value);
  };

  handleMapFields = (value: string) => {
    const parentForm = this.maskfield.querySelector("input").form;
    const map = this.getMap();
    const fields = this.getMapFields();
    // TODO Compare map and fields
    // TODO find fields "parent" container, when hiding, also "remove" 'flex-fill' elements above?(or after)

    const selectedMapObject = map.find((mapObject) => mapObject.key === value);

    const visibleFields = selectedMapObject ? selectedMapObject.values : [];

    fields.forEach((field) => {
      const fieldInput = field.querySelector("input");
      const fieldNameID = fieldInput.id.substring(parentForm.name.length + 1);

      if (!visibleFields.includes(fieldNameID)) {
        // Hide and clear input
        field.style.display = "none";
        fieldInput.value = undefined;
        return;
      }

      field.style.display = "unset";
    });
  };

  // What if multiple maskfield "holds" same input ?
  // Check sonata maskfield behaviour (checked, it's display: none;)
}
