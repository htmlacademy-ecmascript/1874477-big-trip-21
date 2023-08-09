import { createElement } from '../render.js';

function createEventFormTemplate() {
  return '<ul class="trip-events__list"></ul>';
}

export default class EventFormView {
  getTemplate() {
    return createEventFormTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
