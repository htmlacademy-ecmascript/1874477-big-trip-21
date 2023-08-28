import { Offers } from './types-ts';

const POINT_TYPES = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'] as const;
const FILTER_TYPES = ['everything', 'future', 'present', 'past'] as const;
type FilterType = typeof FILTER_TYPES[number];
const SORT_TYPES = ['sort-price', 'sort-time', 'sort-day'] as const;
const EMPTY_MESSAGES = ['Click New Event to create your first point', 'There are no past events now',
	'There are no present events now', 'There are no future events now'] as const;

const AllOffers: Offers = {
	'Taxi': [
		{
			id: crypto.randomUUID(),
			name: 'Transfer',
			cost: 80,
			checked: true,
		},
		{
			id: crypto.randomUUID(),
			name: 'Upgrade to comfort class',
			cost: 100,
			checked: false,
		}
	],

	'Bus': [
		{
			id: crypto.randomUUID(),
			name: 'Upgrade to comfort class',
			cost: 150,
			checked: true,
		},
		{
			id: crypto.randomUUID(),
			name: 'Choose seats',
			cost: 33,
			checked: false,
		}
	],

	'Train': [
		{
			id: crypto.randomUUID(),
			name: 'Choose seats',
			cost: 250,
			checked: true,
		},
		{
			id: crypto.randomUUID(),
			name: 'Order meal',
			cost: 45,
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
			cost: 120,
			checked: false,
		},
		{
			id: crypto.randomUUID(),
			name: 'Choose the time of check-in',
			cost: 50,
			checked: true,
		},
		{
			id: crypto.randomUUID(),
			name: 'Choose the time of check-out',
			cost: 50,
			checked: false,
		},
	],

	'Restaurant': [
		{
			id: crypto.randomUUID(),
			name: 'Order a meal from the restaurant',
			cost: 2000,
			checked: false,
		},
		{
			id: crypto.randomUUID(),
			name: 'Switch place',
			cost: 2500,
			checked: true,
		},
		{
			id: crypto.randomUUID(),
			name: 'Business lounge',
			cost: 8220,
			checked: true,
		}
	],
};

export { POINT_TYPES, FILTER_TYPES, EMPTY_MESSAGES, SORT_TYPES, AllOffers, FilterType };
