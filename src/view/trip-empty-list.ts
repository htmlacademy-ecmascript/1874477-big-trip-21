import AbstractView from '../framework/view/abstract-view';
import { EmptyListMessage } from '../const';
import { FilterType } from '../types-ts';

function createEmptyListMessage(filterType: FilterType) {
  const emptyListMessage = EmptyListMessage[filterType];
  return /*html*/`<p class="trip-events__msg"> ${emptyListMessage}</p>`;
}

export default class TripEmptyView extends AbstractView<HTMLParagraphElement> {
  #filterType: FilterType | null = null;

  constructor({ filterType }: { filterType: FilterType | null}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createEmptyListMessage(this.#filterType!);
  }
}
