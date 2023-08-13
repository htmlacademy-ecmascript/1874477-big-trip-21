interface Point {
  type: string;
  destination: {
    name: string;
    photos: Photo[];
    description: string;
  };
  isFavorite: boolean;
  dates: {
    start?: string;
    end?: string;
  };
  offers: Offer[];
  cost: number;
}

interface Photo {
  src: string;
  alt: string;
}

interface Offer {
  name: string;
  cost: number;
  checked: boolean;
}

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


export { Point, Photo, Offer, pointTypes }
