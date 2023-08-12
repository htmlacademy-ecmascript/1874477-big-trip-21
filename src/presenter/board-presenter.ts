import SortView from '../views/sort';
import PointView from '../views/point';
import EventListView from '../views/trip-list';
import PointEditView from '../views/point-edit';
import PointsModel from '../model/trip-model';
import { render } from '../render';

export default class BoardPresenter {
  [x: string]: any;
  boardComponent = new EventListView();
  boardContainer: HTMLElement;
  private pointsModel: PointsModel;

  constructor({ boardContainer }: { boardContainer: HTMLElement }) {
    this.boardContainer = boardContainer;
    this.pointsModel = new PointsModel();
  }

  init() {
    this.points = this.pointsModel.getPoints().slice();

    render(new SortView(), this.boardContainer);
    render(this.boardComponent, this.boardContainer);
    render(new PointEditView(this.points[0]), this.boardComponent.element);

    for (let i = 1; i < this.points.length; i++) {
      render(new PointView(this.points[i]), this.boardComponent.element);
    }
  }
}
