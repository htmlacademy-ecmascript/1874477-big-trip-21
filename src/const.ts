const POINT_TYPES = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'] as const;
const FILTER_TYPES = ['everything', 'future', 'present', 'past'] as const;
const SORT_TYPES = ['sort-price', 'sort-time', 'sort-day'] as const;
const EMPTY_MESSAGES = ['Click New Event to create your first point', 'There are no past events now',
	'There are no present events now', 'There are no future events now'] as const;

export { POINT_TYPES, FILTER_TYPES, EMPTY_MESSAGES, SORT_TYPES };
