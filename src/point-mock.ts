import { getRandomArrayElement } from './utils/utils';
import { Point, Offers } from './types-ts';
import { AllOffers } from './const';
import {nanoid} from 'nanoid';

const destinationDescriptions = [
	`Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa amet dignissimos quae
  placeat aut ipsum, labore facere cum nulla maxime repudiandae voluptate modi harum hic
  adipisci nobis molestiae impedit dicta eligendi officia corrupti quibusdam, eaque alias.
  Facere dolorum esse, tempora quo non consequatur officiis repellat ratione. Facilis
  incidunt quae odit accusantium commodi perferendis vero voluptates quidem officia qui
  sint, consectetur consequatur soluta error. Porro quisquam eligendi assumenda incidunt
  eveniet laboriosam veritatis iusto iure adipisci ut dolores debitis, eum voluptatum.
  Tempore debitis alias iste quia temporibus beatae quasi illo rerum, error aliquid dolorem ab.
  Sequi facilis laudantium temporibus dicta ratione delectus?`
];

const destinations = [
	{
		id: crypto.randomUUID(),
		name: 'Kiev',
		description: destinationDescriptions[0],
		photos: [
			{
				src: 'img/photos/1.jpg',
				alt: 'Event photo 1'
			},
		]
	},
	{
		id: crypto.randomUUID(),
		name: 'London',
		description: destinationDescriptions[0].slice(100),
		photos: [
			{
				src: 'img/photos/2.jpg',
				alt: 'Event photo 2'
			},
		]
	},
	{
		id: crypto.randomUUID(),
		name: 'Amsterdam',
		description: destinationDescriptions[0].slice(50, 80),
		photos: [
			{
				src: '',
				alt: ''
			},
		]
	},
	{
		id: crypto.randomUUID(),
		name: 'Paris',
		description: destinationDescriptions[0],
		photos: [
			{
				src: 'img/photos/1.jpg',
				alt: 'Event photo 1'
			},
		]
	},
	{
		id: crypto.randomUUID(),
		name: 'Dubai',
		description: destinationDescriptions[0].slice(50, 120),
		photos: [
			{
				src: 'img/photos/1.jpg',
				alt: 'Event photo 1'
			},
			{
				src: 'img/photos/2.jpg',
				alt: 'Event photo 2'
			},
			{
				src: 'img/photos/3.jpg',
				alt: 'Event photo 3'
			},
		]
	},
	{
		id: crypto.randomUUID(),
		name: 'Sharm',
		description: destinationDescriptions[0].slice(50, 120),
		photos: [
			{
				src: 'img/photos/1.jpg',
				alt: 'Event photo 1'
			},
			{
				src: 'img/photos/2.jpg',
				alt: 'Event photo 2'
			},
			{
				src: 'img/photos/3.jpg',
				alt: 'Event photo 3'
			},
		]
	},
];

const offers: Offers = {
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

const now = new Date();

const NEW_BLANK_POINT = {
	type: 'Flight',
	destination: {
		id: '',
		name: '',
		description: '',
		photos: []
	},
	dateFrom: now.toISOString(),
	dateTo: now.toISOString(),
	offers: [],
	cost: 0,
	isFavorite: false,
};

const mockWayPoints: Point[] = [
	{
		type: 'Flight',
		destination: destinations[2],
		dateFrom: '2023-07-18T10:30',
		dateTo: '2023-07-20T10:50',
		offers: AllOffers['Flight'],
		cost: 5000,
		isFavorite: true,
	},
	{
		type: 'Ship',
		destination: {
			id: '',
			name: '',
			description: '',
			photos: []
		},
		dateFrom: '2023-10-10T10:30',
		dateTo: '2023-10-10T14:00',
		offers: AllOffers['Ship'],
		cost: 1000,
		isFavorite: false,
	},
	{
		type: 'Check-in',
		destination: destinations[5],
		dateFrom: '2023-11-01T03:04',
		dateTo: '2023-11-01T17:30',
		offers: AllOffers['Check-in'],
		cost: 400,
		isFavorite: false,
	},
	{
		type: 'taxi',
		destination: destinations[3],
		dateFrom: '2023-11-20T05:03',
		dateTo: '2023-11-20T13:17',
		offers: AllOffers['taxi'],
		cost: 800,
		isFavorite: true,
	},
	{
		type: 'Bus',
		destination: destinations[5],
		dateFrom: '2023-07-24T00:22',
		dateTo: '2023-08-11T09:20',
		offers: AllOffers['Bus'],
		cost: 450,
		isFavorite: false,
	},
	{
		type: 'Ship',
		destination: destinations[1],
		dateFrom: '2023-08-10T10:30',
		dateTo: '2023-08-10T14:00',
		offers: AllOffers['Ship'],
		cost: 1000,
		isFavorite: false,
	},
];

function getBlankPoint(): Point {
	return NEW_BLANK_POINT;
}

function getRandomPoint(): Point {
	return {
		id: nanoid(),
		...getRandomArrayElement(mockWayPoints)
	};
}

function getDestinations() {
	return destinations;
}


export { getBlankPoint, getRandomPoint, getDestinations, NEW_BLANK_POINT, offers, destinations };
