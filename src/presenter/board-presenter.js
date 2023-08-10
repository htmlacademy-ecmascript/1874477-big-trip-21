import SortView from '../view/sort-view.js';
import WaypointView from '../view/waypoint-view.js';
import WaypointAddView from '../view/waypoint-add-view.js';
import EventListView from '../view/event-list-view.js';
import WaypointEditView from '../view/waypoint-edit-view.js';
import { render } from '../render.js';

export default class BoardPresenter {
  boardComponent = new EventListView();


  constructor({ boardContainer }) {
    this.boardContainer = boardContainer;
  }

  init() {
    render(new SortView(), this.boardContainer);
    render(this.boardComponent, this.boardContainer);
    render(new WaypointEditView(), this.boardComponent.getElement());
    render(new WaypointAddView(), this.boardComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new WaypointView(), this.boardComponent.getElement());
    }
  }
}
