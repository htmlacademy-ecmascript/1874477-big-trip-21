import BoardPresenter from './presenter/board-presenter';
import PointsModel from './model/trip-model';

const tripContainer = document.querySelector('.trip-events') as HTMLElement;

const pointsModel = new PointsModel();
const boardPresenter = new BoardPresenter({ boardContainer: tripContainer, pointsModel });
boardPresenter.init();

