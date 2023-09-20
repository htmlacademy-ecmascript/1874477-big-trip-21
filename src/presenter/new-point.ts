import PointEditView from '../view/point-edit';
import { render, remove } from '../framework/render';
import { NEW_BLANK_POINT } from '../const';
import { Point, Offer, UpdateType, UserAction, Destination } from '../types-ts';

interface NewPointPresenterProps {
	pointContainer: HTMLElement,
	allOffers: Offer[];
	destination: Destination[];
	onDataChange: ((action: UserAction, updateType: UpdateType, point: Point) => void) | null,
	onDestroy: () => void
}

export default class NewPointPresenter {
	#pointContainer: HTMLElement | null = null;
	#pointEditComponent: PointEditView | null = null;
	#newPoint: Point = NEW_BLANK_POINT;
	#allOffers: Offer[];
	#destinations: Destination[];

	#handleDataChange: ((action: UserAction, updateType: UpdateType, point: Point) => void) | null = null;
	#handleDestroy: () => void;

	constructor({ pointContainer, onDataChange, onDestroy, allOffers, destination }: NewPointPresenterProps) {
		this.#pointContainer = pointContainer;
		this.#newPoint = NEW_BLANK_POINT;
		this.#allOffers = allOffers;
		this.#destinations = destination;
		this.#handleDataChange = onDataChange;
		this.#handleDestroy = onDestroy;
	}

	init() {
		if (this.#pointEditComponent !== null) {
			return;
		}

		this.#pointEditComponent = new PointEditView({
			point: this.#newPoint,
			allOffers: this.#allOffers!,
			destinations: this.#destinations!,
			onFormSubmit: this.#handleFormSubmit,
			onDeleteClick: this.#handleDeleteClick,
			isDeleting: false,
			isSaving: false,
			isDisabled: false,
		});

		render(this.#pointEditComponent, this.#pointContainer!, 'afterbegin');

		document.addEventListener('keydown', this.#escKeyDownHandler);
	}

	destroy() {
		if (this.#pointEditComponent === null) {
			return;
		}

		this.#handleDestroy();

		remove(this.#pointEditComponent);
		this.#pointEditComponent = null;

		document.removeEventListener('keydown', this.#escKeyDownHandler);
	}

	setSaving() {
		this.#pointEditComponent!.updateElement({
			isDisabled: true,
			isSaving: true,
		});
	}

	setAborting() {
		const resetFormState = () => {
			this.#pointEditComponent!.updateElement({
				isDisabled: false,
				isSaving: false,
				isDeleting: false,
			});
		};

		this.#pointEditComponent!.shake(resetFormState);
	}

	#handleFormSubmit = (point: Point) => {
		this.#handleDataChange!(
			'ADD_POINT',
			'MAJOR',
			point,
		);
	};

	#handleDeleteClick = () => {
		this.destroy();
	};

	#escKeyDownHandler = (evt: KeyboardEvent) => {
		if (evt.key === 'Escape' || evt.key === 'Esc') {
			evt.preventDefault();
			this.destroy();
		}
	};
}
