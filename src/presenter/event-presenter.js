import SortView from '../view/sort.js';
import WaypointView from '../view/waypoint.js';
import AddFormView from '../view/creation-form.js';
import EventFormView from '../view/event-form.js';
import EditFormView from '../view/edit-form.js';
import { render } from '../render.js';

export default class EventPresenter {
  eventComponent = new EventFormView();


  constructor({ eventContainer }) {
    this.eventContainer = eventContainer;
  }

  init() {
    render(new SortView(), this.eventContainer);
    render(this.eventComponent, this.eventContainer);
    render(new EditFormView(), this.eventComponent.getElement());
    render(new AddFormView(), this.eventComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new WaypointView(), this.eventComponent.getElement());
    }
  }
}
