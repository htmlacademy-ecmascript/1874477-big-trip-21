import FilterView from '../views/filter';
import TripInfoView from '../views/trip-info';
import SortView from '../views/sort';
import PointView from '../views/point';
import EventListView from '../views/trip-list';
import PointEditView from '../views/point-edit';
import PointsModel from '../model/trip-model';
import { render } from '../render';

const headerTripElement = document.querySelector('.trip-main');
const headerFilterElement = document.querySelector('.trip-controls__filters');
export default class BoardPresenter {
  boardComponent = new EventListView();
  boardContainer: HTMLElement;
  pointsModel: PointsModel;
  points: any[] = [];

  constructor({ boardContainer, pointsModel }: { boardContainer: HTMLElement, pointsModel: PointsModel }) {
    this.boardContainer = boardContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.points = [...this.pointsModel.getPoints()];

    render(new SortView(), this.boardContainer);
    render(this.boardComponent, this.boardContainer);
    render(new PointEditView(this.points[0]), this.boardComponent.element);

    for (let i = 1; i < this.points.length; i++) {
      render(new PointView(this.points[i]), this.boardComponent.element);
    }

    if (headerTripElement && headerFilterElement) {
    const tripInfoView = new TripInfoView(this.points);
    render(tripInfoView, headerTripElement, 'afterbegin');

    const filterView = new FilterView();
    render(filterView, headerFilterElement);
  }
}
}
