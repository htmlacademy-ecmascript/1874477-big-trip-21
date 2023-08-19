import PointView from '../views/point';
import PointEditView from '../views/point-edit';
import { Point } from '../types-ts';
import { render, replace} from '../framework/render';

export default class PointPresenter {
	#pointContainer: HTMLElement;
	#formButtonElement: HTMLButtonElement;
	#pointComponent!: PointView;
	#pointEditComponent!: PointEditView;

	constructor(pointContainer: HTMLElement) {
		this.#pointContainer = pointContainer;
		this.#formButtonElement = document.querySelector('.event__rollup-btn')!;
	}

	renderPoint(point: Point) {
		const replacePointToForm = () => {
			replace(this.#pointEditComponent, this.#pointComponent);
		};

		const replaceFormToPoint = () => {
			replace(this.#pointComponent, this.#pointEditComponent);
		};

		const escKeyDownHandler = (evt: KeyboardEvent) => {
			if (evt.key === 'Escape') {
				evt.preventDefault();
				replaceFormToPoint();
				document.removeEventListener('keydown', escKeyDownHandler);
			}
		};

		const clickButtonHandler = (evt: Event) => {
			evt.preventDefault();
			replaceFormToPoint();
			this.#formButtonElement.removeEventListener('click', clickButtonHandler);
		};

		this.#pointComponent = new PointView({
			point,
			onEditClick: () => {
				replacePointToForm();
				document.addEventListener('keydown', escKeyDownHandler);
			},
		});

		this.#pointEditComponent = new PointEditView({
			point,
			onFormSubmit: () => {
				replaceFormToPoint();
				document.removeEventListener('keydown', escKeyDownHandler);
			},
			onButtonClick: () => {
				replaceFormToPoint();
				document.removeEventListener('keydown', escKeyDownHandler);
				document.removeEventListener('click', clickButtonHandler);
			},
		});

		render(this.#pointComponent, this.#pointContainer);
	}
}
