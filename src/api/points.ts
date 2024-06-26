import ApiService from '../framework/api-service';
import { Point, AdaptedPoint } from '../types-ts';

export default class PointsApiService extends ApiService {
  get points(): Promise<AdaptedPoint[]> {
    return this._load({ method: 'GET', url: 'points', body: null, headers: new Headers() })
      .then((response: Response | undefined) => {
        if (response) {
          return ApiService.parseResponse(response);
        }
        throw new Error('Invalid response');
      });
  }

  async updatePoint(point: Point) {
    const response = await this._load({
      url: `points/${point.id}`,
      method: 'PUT',
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    const parsedResponse = await ApiService.parseResponse(response!);

    return parsedResponse;
  }

  async addPoint(point: Point) {
    const response = await this._load({
      url: 'points',
      method: 'POST',
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    const parsedResponse = await ApiService.parseResponse(response!);

    return parsedResponse;
  }

  async deletePoint(point: Point) {
    const response = await this._load({
      url: `points/${point.id}`,
      method: 'DELETE',
      body: null,
      headers: undefined,
    });

    return response;
  }

  #adaptToServer(point: Point) {
    const adaptedPoint: Partial<Point> & AdaptedPoint = {
      ...point,
      'base_price': point.cost,
      'date_from': point.dateFrom,
      'date_to': point.dateTo,
      'is_favorite': point.isFavorite,
    };

    delete adaptedPoint.cost;
    delete adaptedPoint.dateFrom;
    delete adaptedPoint.dateTo;
    delete adaptedPoint.isFavorite;

    return adaptedPoint;
  }
}
