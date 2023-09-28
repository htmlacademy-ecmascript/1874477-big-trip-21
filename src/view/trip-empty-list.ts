import AbstractView from '../framework/view/abstract-view';
import { EmptyListMessage } from '../const';
import { FilterType } from '../types-ts';

function createEmptyListMessage(filterType: FilterType) {
  let emptyListMessage: EmptyListMessage;

  switch (filterType) {
    case 'everything':
      emptyListMessage = EmptyListMessage.EVERYTHING;
      break;
    case 'future':
      emptyListMessage = EmptyListMessage.FUTURE;
      break;
    case 'present':
      emptyListMessage = EmptyListMessage.PRESENT;
      break;
    case 'past':
      emptyListMessage = EmptyListMessage.PAST;
      break;
    default:
      throw new Error('Invalid filter type');
  }

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
