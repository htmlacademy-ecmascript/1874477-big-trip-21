import PointView from '../view/point';
import PointEditView from '../view/point-edit';
import { Point, Offer, OfferItem, UserAction, UpdateType, Destination } from '../types-ts';
import { Mode } from '../const';
import { render, replace, remove } from '../framework/render';

interface PointPresenterProps {
  pointContainer: HTMLElement,
  onDataChange: ((action: UserAction, updateType: UpdateType, point: Point) => void) | null,
  onModeChange: () => void
}

export default class PointPresenter {
  #pointContainer: HTMLElement | null = null;
  #pointComponent: PointView | null = null;
  #pointEditComponent: PointEditView | null = null;
  #point: Point | null = null;
  #originalPoint: Point | null = null;
  #allOffers: Offer[] | null = null;
  #destinations: Destination[] | null = null;
  #mode = Mode.DEFAULT;
  #handleDataChange: ((action: UserAction, updateType: UpdateType, point: Point) => void) | null = null;
  #handleModeChange: () => void;

  constructor({ pointContainer, onDataChange, onModeChange }: PointPresenterProps) {
    this.#pointContainer = pointContainer;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(point: Point, allOffers: Offer[], destinations: Destination[]) {
    this.#point = point;
    this.#allOffers = allOffers;
    this.#destinations = destinations;

    const destinationId = this.#point.destination.toString();
    const foundIndex = this.#destinations.findIndex((item) => item.id === destinationId);
    const destinationName = foundIndex !== -1 ? this.#destinations[foundIndex]?.name ?? '' : '';
    const offersForType = this.#getOffersByType(this.#point.type);
    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointView({
      point: this.#point,
      destination: destinationName,
      offersForType: offersForType,
      onEditClick: this.#handleEditClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#pointEditComponent = new PointEditView({
      point: this.#point,
      allOffers: allOffers,
      destinations: destinations,
      onFormSubmit: this.#handleEditFormSubmit,
      onButtonClick: this.#handleEditFormClick,
      onDeleteClick: this.#handleEditFormDeleteClick,
      isDeleting: false,
      isSaving: false,
      isDisabled: false,
    });

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#pointContainer!);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointComponent, prevPointEditComponent);
      this.#mode = Mode.DEFAULT;
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy() {
    remove(this.#pointComponent!);
    remove(this.#pointEditComponent!);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#pointEditComponent!.reset(this.#point!);
      this.#replaceFormToPoint();
    }
  }

  setSaving() {
    if (this.#mode === Mode.EDITING) {
      this.#pointEditComponent!.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  }

  setDeleting() {
    if (this.#mode === Mode.EDITING) {
      this.#pointEditComponent!.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  }

  setAborting() {
    if (this.#mode === Mode.DEFAULT) {
      this.#pointComponent!.shake();
      return;
    }

    const resetFormState = () => {
      if (this.#mode === Mode.EDITING) {
        this.#pointEditComponent!.updateElement({
          isDisabled: false,
          isSaving: false,
          isDeleting: false,
        });
      }
    };

    this.#pointEditComponent!.shake(resetFormState);
  }

  #getOffersByType(type: string): OfferItem[] {
    const foundOffers = this.#allOffers!.filter((offer) => offer.type === type);
    const offerItems: OfferItem[] = foundOffers.flatMap((offer) => offer.offers);
    return offerItems;
  }

  #replacePointToForm = () => {
    this.#originalPoint = { ...this.#point! };
    replace(this.#pointEditComponent!, this.#pointComponent!);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  };

  #replaceFormToPoint = () => {
    replace(this.#pointComponent!, this.#pointEditComponent!);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  };

  #escKeyDownHandler = (evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#pointEditComponent!.reset(this.#point!);
      this.#replaceFormToPoint();
    }
  };

  #handleEditClick = () => {
    this.#replacePointToForm();
  };

  #handleEditFormClick = () => {
    this.#pointEditComponent!.reset(this.#point!);
    this.#replaceFormToPoint();
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange!(
      'UPDATE_POINT',
      'MINOR',
      { ...this.#point!, isFavorite: !this.#point!.isFavorite });
  };

  #handleEditFormSubmit = (point: Point) => {
    const isMajorUpdate =
      this.#originalPoint?.dateTo !== point.dateTo ||
      this.#originalPoint?.dateFrom !== point.dateFrom ||
      this.#originalPoint?.type !== point.type ||
      this.#originalPoint?.destination !== point.destination;

    this.#handleDataChange!(
      'UPDATE_POINT',
      isMajorUpdate ? 'MAJOR' : 'MINOR',
      point,
    );
  };

  #handleEditFormDeleteClick = (point: Point) => {
    this.#handleDataChange!(
      'DELETE_POINT',
      'MINOR',
      point,
    );
  };
}
