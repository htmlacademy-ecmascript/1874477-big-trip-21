import AbstractView from '../framework/view/abstract-view';
import { TimeLimit } from '../const';

function createServerMessage(message: string) {
  return /*html*/`<p class="trip-events__msg">${message}</p>`;
}

export default class ServerMessageView extends AbstractView {
  #message: string;

  constructor(message: string) {
    super();
    this.#message = message;
    setTimeout(this.#errorMessageClickHandler, TimeLimit.TIMEOUT);
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
