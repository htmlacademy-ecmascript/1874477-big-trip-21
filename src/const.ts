import { Point } from './types-ts';

const POINT_TYPES = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'] as const;
const AUTHORIZATION = 'Basic dsWewwes5dweq52645';
const API_POINT = 'https://22.objects.htmlacademy.pro/big-trip';

const enum ServerMessage {
  LOADING = 'Loading...',
  ERROR = 'Failed to load latest route information'
}

type Method = 'GET' | 'PUT' | 'POST' | 'DELETE';

const enum Mode {
  DEFAULT,
  EDITING,
  CREATING,
}

const enum TimeLimit {
  TIMEOUT = 3000,
  LOWER_LIMIT = 350,
  UPPER_LIMIT = 1000,
}

const NEW_BLANK_POINT: Point = {
  type: 'flight',
  destination: {
    id: '',
    name: '',
    description: '',
    pictures: []
  },
  dateFrom: '',
  dateTo: '',
  offers: [''],
  cost: 0,
  isFavorite: false,
};

export { AUTHORIZATION, API_POINT, ServerMessage, Mode, TimeLimit, NEW_BLANK_POINT, POINT_TYPES };
export type { Method };
