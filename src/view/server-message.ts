import AbstractView from '../framework/view/abstract-view';

function createServerMessage(message: string) {
	return /*html*/`<p class="trip-events__msg">${message}</p>`;
}

export default class ServerMessageView extends AbstractView {
	#message: string;

	constructor(message: string) {
		super();
		this.#message = message;
		setTimeout(this.#errorMessageClickHandler, 3000);
	}

	get template() {
		return createServerMessage(this.#message);
	}

	#removeError() {
		this.element.remove();
	}

	#errorMessageClickHandler = () => {
		this.#removeError();
	};
}
