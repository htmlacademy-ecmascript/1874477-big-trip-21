interface Destination {
  id: string;
  name: string;
  description: string;
  photos: {
    src: string;
    alt: string;
  }[]
}
interface Offer {
  id: string;
  checked: boolean;
  name: string;
  cost: number;
}

type Offers = {
  [key: string]: Offer[];
};
interface Photo {
  src: string;
  alt: string;
}
interface Point {
  id?: string;
  type: string;
  destination: Destination;
  dateFrom: string;
  dateTo: string;
  offers: Offer[];
  cost: number;
  isFavorite: boolean;
}

type UserAction = 'UPDATE_POINT' | 'ADD_POINT' | 'DELETE_POINT';

type UpdateType = 'PATCH' | 'MINOR' | 'MAJOR';

type FilterType = 'everything' | 'future' | 'present' | 'past';

type SortType = 'sort-price' | 'sort-time' | 'sort-day';

interface PointEditState {
  point: Point;
  destination: Destination;
  offers: Offer[];
}

export { Point, Destination, Offer, Photo, Offers, PointEditState, UserAction, UpdateType, FilterType, SortType};
