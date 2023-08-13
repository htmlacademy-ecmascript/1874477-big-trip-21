import BoardPresenter from './presenter/board-presenter';
import PointsModel from './model/trip-model';
import { getFormattedDateDiff } from './utils';

const tripContainer = document.querySelector('.trip-events') as HTMLElement;

const pointsModel = new PointsModel();
const boardPresenter = new BoardPresenter({ boardContainer: tripContainer, pointsModel });
boardPresenter.init();



const date1 = new Date('2023-08-12 10:11:00');
const date2 = new Date('2023-08-15 12:35:50');
const formattedDiff = getFormattedDateDiff(date1, date2);
console.log(formattedDiff);
