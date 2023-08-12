import { getRandomPoint } from '../point-mock';

const POINTS_COUNT = 4;

export default class PointsModel {
  points = Array.from({length: POINTS_COUNT}, getRandomPoint);

  getPoints() {
    console.log(this.points);
    return this.points;
  }
}
