import PointView from '../views/point';
import PointEditView from '../views/point-edit';
import { Point } from '../types-ts';
import { render, replace} from '../framework/render';

export default class PointPresenter {
	#pointContainer: HTMLElement | null = null;
	#pointComponent: PointView | null = null;
	#pointEditComponent: PointEditView | null = null;

	constructor(pointContainer: HTMLElement) {
		this.#pointContainer = pointContainer;
	}

	renderPoint(point: Point) {
		const replacePointToForm = () => {
			replace(this.#pointEditComponent!, this.#pointComponent!);
		};

		const replaceFormToPoint = () => {
			replace(this.#pointComponent!, this.#pointEditComponent!);
		};

		const escKeyDownHandler = (evt: KeyboardEvent) => {
			if (evt.key === 'Escape') {
				evt.preventDefault();
				replaceFormToPoint();
				document.removeEventListener('keydown', escKeyDownHandler);
			}
		};

		this.#pointComponent = new PointView({
			point,
			onEditClick: () => {
				replacePointToForm();
				document.addEventListener('keydown', escKeyDownHandler);
			},
			onFavoriteClick: () => {

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
			},
		});

		render(this.#pointComponent, this.#pointContainer!);
	}
}
