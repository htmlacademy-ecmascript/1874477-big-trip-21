import AbstractView from '../framework/view/abstract-view';

import { FilterType } from '../types-ts';

const EmptyListMessageMap: Record<FilterType, string> = {
  everything: 'Click New Event to create your first point',
  future: 'There are no future events now',
  present: 'There are no present events now',
  past: 'There are no past events now',
};

function createEmptyListMessage(filterType: FilterType) {
  return /*html*/`<p class="trip-events__msg"> ${EmptyListMessageMap[filterType]}</p>`;
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
