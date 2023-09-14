import PointEditView from '../views/point-edit';
import { render, remove } from '../framework/render';
import { NEW_BLANK_POINT } from '../point-mock';
import { Point, UpdateType, UserAction } from '../types-ts';
import { nanoid } from 'nanoid';

interface NewPointPresenterProps {
	pointContainer: HTMLElement,
	onDataChange: ((action: UserAction, updateType: UpdateType, point: Point) => void) | null,
	onDestroy: () => void
}

export default class NewPointPresenter {
	#pointContainer: HTMLElement | null = null;
	#pointEditComponent: PointEditView | null = null;
	#newPoint: Point = NEW_BLANK_POINT;

	#handleDataChange: ((action: UserAction, updateType: UpdateType, point: Point) => void) | null = null;
	#handleDestroy: () => void;

	constructor({ pointContainer, onDataChange, onDestroy }: NewPointPresenterProps) {
		this.#pointContainer = pointContainer;
		this.#handleDataChange = onDataChange;
		this.#handleDestroy = onDestroy;
	}

	init() {
		if (this.#pointEditComponent !== null) {
			return;
		}

		this.#pointEditComponent = new PointEditView({
			point: this.#newPoint,
			onFormSubmit: this.#handleFormSubmit,
			onDeleteClick: this.#handleDeleteClick,
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

	#handleFormSubmit = (point: Point) => {
		this.#handleDataChange!(
			'ADD_POINT',
			'MINOR',
			{ id: nanoid(), ...point },
		);
		this.destroy();
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
