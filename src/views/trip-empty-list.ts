// import type { MessageText } from '../constants/messages';
import AbstractView from '../framework/view/abstract-view';

function createEmptyListMessage(message: string) {
	return `<p class="trip-events__msg">${message}</p>`;
}

export default class TripEmptyView extends AbstractView<HTMLParagraphElement> {
	#content: string | null = null;

	constructor(content: string) {
		super();
		this.#content = content;
	}

	get template() {
		return createEmptyListMessage(this.#content!);
	}
}

