import { getRandomArrayElement } from './utils';

const pointTypes = {
  TAXI: 'Taxi',
  BUS: 'Bus',
  TRAIN: 'Train',
  SHIP: 'Ship',
  DRIVE: 'Drive',
  FLIGHT: 'Flight',
  CHECK_IN: 'Check-in',
  SIGHTSEEING: 'Sightseeing',
  RESTARAUNT: 'Restaurant'
};

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
    name: 'Moskow',
    description: destinationDescriptions[0],
    photos: [
      {
        src: 'img/photos/1.jpg',
        alt: 'Event photo 1'
      },
    ]
  },
  {
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
    name: 'Amsterdam',
    description: destinationDescriptions[0].slice(50, 80),
    photos: []
  },
  {
    name: 'New Zealand',
    description: destinationDescriptions[0].slice(80, 120),
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

const offers = {
  [pointTypes.TAXI]: [
    {
      name: 'Transfer',
      cost: 80,
      checked: true,
    },
    {
      name: 'Meet in Airport',
      cost: 100,
      checked: false,
    }
  ],

  [pointTypes.FLIGHT]: [
    {
      name: 'Extra Luggage',
      cost: 150,
      checked: false,
    }
  ],

  [pointTypes.CHECK_IN]: [
    {
      name: 'Lunch',
      cost: 320,
      checked: true,
    },
  ],

  [pointTypes.BUS]: [
    {
      name: 'Switch to comfort',
      cost: 80,
      checked: false,
    }
  ],
};

const NEW_BLANK_POINT = {
  type: pointTypes.FLIGHT,
  destination: {
    name: '',
    description: '',
    photos: []
  },
  dates: {
    start: undefined,
    end: undefined
  },
  offers: [],
  cost: 0,
  isFavorite: false,
};

const mockWayPoints = [
  {
    type: pointTypes.FLIGHT,
    destination: destinations[3],
    dates: {
      start: '2019-03-18T10:30',
      end: '2019-03-20T10:50'
    },
    offers: offers[pointTypes.FLIGHT],
    cost: 5000,
    isFavorite: true,
  },

  {
    type: pointTypes.SHIP,
    destination: '',
    dates: {
      start: '2023-08-10T10:30',
      end: '2023-08-10T14:00'
    },
    offers: offers[pointTypes.SHIP],
    cost: 1000,
    isFavorite: false,
  },

  {
    type: pointTypes.CHECK_IN,
    destination: destinations[0],
    dates: {
      start: '2023-02-01T03:04',
      end: '2023-10-01T17:30'
    },
    offers: offers[pointTypes.CHECK_IN],
    cost: 400,
    isFavorite: false,
  },

  {
    type: pointTypes.TAXI,
    destination: destinations[1],
    dates: {
      start: '2023-11-25T05:03',
      end: '2023-09-20T13:17'
    },
    offers: offers[pointTypes.TAXI],
    cost: 800,
    isFavorite: false,
  },

  {
    type: pointTypes.BUS,
    destination: destinations[2],
    dates: {
      start: '2023-07-24T00:22',
      end: '2023-08-11T09:20'
    },
    offers: offers[pointTypes.BUS],
    cost: 450,
    isFavorite: false,
  },
];

function getBlankPoint() {
  return NEW_BLANK_POINT;
}

function getRandomPoint() {
  return getRandomArrayElement(mockWayPoints);
}

function getDestinations() {
  return destinations;
}


export {getBlankPoint, getRandomPoint, getDestinations};
