import TripPresenter from './presenter/trip';
import PointsModel from './model/trip';

const tripContainer = document.querySelector<HTMLDivElement>('.trip-events');

if (!tripContainer) {
	throw new Error('Elements not found');
}

const pointsModel = new PointsModel();
const tripPresenter = new TripPresenter({ tripContainer: tripContainer, pointsModel });
tripPresenter.init();


