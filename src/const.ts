import { Point } from './types-ts';

const POINT_TYPES = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'] as const;
const AUTHORIZATION = 'Basic dsWewwes5dweq52645';
const API_POINT = 'https://21.objects.pages.academy/big-trip';

const enum ServerMessage {
  LOADING = 'Loading...',
  ERROR = 'Failed to load latest route information'
}

const enum Method {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE'
}

const enum Mode {
  DEFAULT = 'DEFAULT',
  EDITING = 'EDITING',
  CREATING = 'CREATING',
}

const enum TimeLimit {
  TIMEOUT = 3000,
  LOWER_LIMIT = 350,
  UPPER_LIMIT = 1000,
}

const enum EmptyListMessage {
  EVERYTHING = 'Click New Event to create your first point',
  FUTURE = 'There are no future events now',
  PRESENT = 'There are no present events now',
  PAST = 'There are no past events now',
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

export { AUTHORIZATION, API_POINT, ServerMessage, Method, Mode, TimeLimit, NEW_BLANK_POINT, POINT_TYPES, EmptyListMessage };
