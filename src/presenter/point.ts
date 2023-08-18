import PointView from '../views/point';
import PointEditView from '../views/point-edit';
import { Point } from '../types-ts';
import { render, replace} from '../framework/render';

export default class PointPresenter {
	#pointContainer: HTMLElement;

	constructor(pointContainer: HTMLElement) {
		this.#pointContainer = pointContainer;
	}

	renderPoint(point: Point) {
		const escKeyDownHandler = (evt: KeyboardEvent) => {
			if (evt.key === 'Escape') {
				evt.preventDefault();
				replaceFormToPoint();
				document.removeEventListener('keydown', escKeyDownHandler);
			}
		};
		const pointComponent = new PointView({
			point,
			onEditClick: () => {
				replacePointToForm();
				document.addEventListener('keydown', escKeyDownHandler);
			}
		});
		const pointEditComponent = new PointEditView({
			point,
			onFormSubmit: () => {
				replaceFormToPoint();
				document.removeEventListener('keydown', escKeyDownHandler);
			}
		});

		function replacePointToForm() {
			replace(pointEditComponent, pointComponent);
		}

		function replaceFormToPoint() {
			replace(pointComponent, pointEditComponent);
		}

		render(pointComponent, this.#pointContainer);
	}

}
