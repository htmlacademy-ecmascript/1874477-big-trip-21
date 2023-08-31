import PointView from '../views/point';
import PointEditView from '../views/point-edit';
import { Point } from '../types-ts';
import { Mode, UserAction, UpdateType } from '../const';
import { render, replace, remove } from '../framework/render';

export default class PointPresenter {
	#pointContainer: HTMLElement | null = null;
	#pointComponent: PointView | null = null;
	#pointEditComponent: PointEditView | null = null;
	#point: Point | null = null;
	#mode = Mode.DEFAULT;
	#handleDataChange: ((action: string, updateType: string, point: Point) => void) | null = null;
	#handleModeChange: () => void;

	constructor({ pointContainer, onDataChange, onModeChange }:
		{
			pointContainer: HTMLElement, onDataChange: ((action: string, updateType: string, point: Point) => void) | null,
			onModeChange: () => void
		}) {
		this.#pointContainer = pointContainer;
		this.#handleDataChange = onDataChange;
		this.#handleModeChange = onModeChange;
	}

	init(point: Point) {
		this.#point = point;

		const prevPointComponent = this.#pointComponent;
		const prevPointEditComponent = this.#pointEditComponent;

		this.#pointComponent = new PointView({
			point: this.#point,
			onEditClick: this.#handleEditClick,
			onFavoriteClick: this.#handleFavoriteClick,
		});

		this.#pointEditComponent = new PointEditView({
			point: this.#point,
			onFormSubmit: this.#handleEditFormSubmit,
			onButtonClick: this.#handleEditFormClick,
			onDeleteClick: this.#handleEditFormDelete,
		});

		if (prevPointComponent === null || prevPointEditComponent === null) {
			render(this.#pointComponent, this.#pointContainer!);
			return;
		}

		if (this.#mode === Mode.DEFAULT) {
			replace(this.#pointComponent, prevPointComponent);
		}

		if (this.#mode === Mode.EDITING) {
			replace(this.#pointEditComponent, prevPointEditComponent);
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

	#replacePointToForm = () => {
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
			UserAction.UPDATE_POINT,
			UpdateType.MINOR,
			{ ...this.#point!, isFavorite: !this.#point!.isFavorite });
	};

	#handleEditFormSubmit = (point: Point) => {
		this.#handleDataChange!(
			UserAction.UPDATE_POINT,
			UpdateType.MINOR,
			point,
		);
		this.#replaceFormToPoint();
	};

	#handleEditFormDelete = (point: Point) => {
		this.#handleDataChange!(
			UserAction.DELETE_POINT,
			UpdateType.MINOR,
			point,
		);
	};
}
