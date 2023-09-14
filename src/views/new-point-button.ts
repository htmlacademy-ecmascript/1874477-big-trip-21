import AbstractView from '../framework/view/abstract-view';

const NewPointButton: string = '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';

export default class NewPointButtonView extends AbstractView {
	#handleClick: (() => void) | null = null;

	constructor({ onClick }: { onClick: () => void }) {
		super();
		this.#handleClick = onClick;
		this.element.addEventListener('click', this.#clickHandler);
	}

	get template() {
		return NewPointButton;
	}

	setDisableAttribute = () => {
		this.element.setAttribute('disabled', '');
	};

	removeDisabledAttribute = () => {
		this.element.removeAttribute('disabled');
	};

	#clickHandler = (evt: Event) => {
		evt.preventDefault();
		this.element.setAttribute('disabled', '');
		this.#handleClick!();
	};
}
