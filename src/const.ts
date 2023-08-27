const POINT_TYPES = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'] as const;
const FILTER_TYPES = ['everything', 'future', 'present', 'past'] as const;
const SORT_TYPES = ['sort-price', 'sort-time', 'sort-day'] as const;
const EMPTY_MESSAGES = ['Click New Event to create your first point', 'There are no past events now',
	'There are no present events now', 'There are no future events now'] as const;

const AllOffers = {
	'Taxi': [
		{
			id: crypto.randomUUID(),
			name: 'Transfer',
			cost: 80,
			checked: true,
		},
		{
			id: crypto.randomUUID(),
			name: 'Meet in Airport',
			cost: 100,
			checked: false,
		}
	],

	'Flight': [
		{
			id: crypto.randomUUID(),
			name: 'Extra Luggage',
			cost: 150,
			checked: false,
		},
		{
			id: crypto.randomUUID(),
			name: 'Eat in travel',
			cost: 12200,
			checked: true,
		}
	],

	'Check-in': [
		{
			id: crypto.randomUUID(),
			name: 'Lunch',
			cost: 320,
			checked: true,
		},
		{
			id: crypto.randomUUID(),
			name: 'Dinner',
			cost: 320,
			checked: false,
		},
	],

	'Train': [
		{
			id: crypto.randomUUID(),
			name: 'Switch to comfort',
			cost: 80,
			checked: false,
		},
		{
			id: crypto.randomUUID(),
			name: 'Switch place',
			cost: 82230,
			checked: true,
		},
		{
			id: crypto.randomUUID(),
			name: 'Switch bus',
			cost: 820,
			checked: true,
		}
	],
};

export { POINT_TYPES, FILTER_TYPES, EMPTY_MESSAGES, SORT_TYPES, AllOffers };
