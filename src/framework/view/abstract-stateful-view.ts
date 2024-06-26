import AbstractView from './abstract-view';

export default abstract class AbstractStatefulView<State, El extends Element = HTMLDivElement> extends AbstractView<El> {
  _state = {} as State;

  updateElement(update: Partial<State>) {
    if (!update) {
      return;
    }

    this._setState(update);

    this.#rerenderElement();
  }

  _restoreHandlers() {
    throw new Error('Abstract method not implemented: restoreHandlers');
  }

  _setState(update: State | Partial<State>) {
    this._state = structuredClone({...this._state, ...update});
  }

  #rerenderElement() {
    const prevElement = this.element;
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.element;

    parent?.replaceChild(newElement, prevElement);

    this._restoreHandlers();
  }
}
