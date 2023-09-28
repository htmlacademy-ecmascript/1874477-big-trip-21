import AbstractView from '../framework/view/abstract-view';

const NEW_POINT_BUTTON_TEMPLATE: string = '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';

export default class NewPointButtonView extends AbstractView<HTMLButtonElement> {
  #handleClick: (() => void) | null = null;

  constructor({ onClick }: { onClick: () => void }) {
    super();
    this.#handleClick = onClick;
    this.element.addEventListener('click', this.#clickHandler);
  }

  get template() {
    return NEW_POINT_BUTTON_TEMPLATE;
  }

  toggleNewPointButton(disabled: boolean = false) {
    this.element.disabled = disabled;
  }

  #clickHandler = (evt: Event) => {
    evt.preventDefault();
    this.toggleNewPointButton();
    this.#handleClick!();
  };
}
