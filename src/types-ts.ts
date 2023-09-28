type UserAction = 'UPDATE_POINT' | 'ADD_POINT' | 'DELETE_POINT';

type UpdateType = 'PATCH' | 'MINOR' | 'MAJOR' | 'INIT' | 'INIT_FAIL';

type FilterType = 'everything' | 'future' | 'present' | 'past';

type SortType = 'sort-price' | 'sort-time' | 'sort-day';

interface Picture {
  src: string;
  description: string;
}

interface Destination {
  id: string;
  description: string;
  name: string;
  pictures: Picture[];
}

interface OfferItem {
  id: string;
  title: string;
  price: number;
}

interface Offer {
  type: string;
  offers: OfferItem[];
}

interface OfferForPoint {
  id: string;
}

interface Point {
  id?: string;
  type: string;
  destination: Destination | string;
  dateFrom: string;
  dateTo: string;
  offers: string[];
  cost: number;
  isFavorite: boolean;
}

interface AdaptedPoint extends Omit<Point, 'dateFrom' | 'dateTo' | 'cost' | 'isFavorite'> {
  base_price: number;
  date_from: string;
  date_to: string;
  is_favorite: boolean;
}

export { Point, AdaptedPoint, Destination, Picture, Offer, OfferItem, OfferForPoint, UserAction, UpdateType, FilterType, SortType };
