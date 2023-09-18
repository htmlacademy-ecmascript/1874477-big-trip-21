import { Point } from './types-ts';
import dayjs from 'dayjs';

const POINT_TYPES = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'] as const;
const AUTHORIZATION = 'Basic dsWewwes5dweq52645';
const API_POINT = 'https://21.objects.pages.academy/big-trip';

const Method = {
	GET: 'GET',
	PUT: 'PUT',
	POST: 'POST',
	DELETE: 'DELETE'
};

const Mode = {
	DEFAULT: 'DEFAULT',
	EDITING: 'EDITING',
	CREATING: 'CREATING',
};

const now = dayjs();

const NEW_BLANK_POINT: Point = {
	type: 'flight',
	destination: {
		id: '',
		name: '',
		description: '',
		pictures: []
	},
	dateFrom: now.toISOString(),
	dateTo: now.toISOString(),
	offers: [''],
	cost: 0,
	isFavorite: false,
};

const EMPTY_MESSAGES = ['Click New Event to create your first point', 'There are no past events now',
	'There are no present events now', 'There are no future events now'] as const;

const NoPointsTextType = {
	['everything']: EMPTY_MESSAGES[0],
	['future']: EMPTY_MESSAGES[3],
	['present']: EMPTY_MESSAGES[2],
	['past']: EMPTY_MESSAGES[1],
};

export { AUTHORIZATION, API_POINT, Method, Mode, now, NEW_BLANK_POINT, POINT_TYPES, EMPTY_MESSAGES, NoPointsTextType };
