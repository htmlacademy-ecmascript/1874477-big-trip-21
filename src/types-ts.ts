interface Destination {
  name: string;
  description: string;
  photos: {
    src: string;
    alt: string;
  }[]
}

interface Dates {
  start: string;
  end: string;
}

interface Offer {
  checked: boolean;
  name: string;
  cost: number;
}

interface Photo {
  src: string;
  alt: string;
}
interface Point {
  type: string;
  destination: Destination;
  dates: Dates;
  offers: Offer[];
  cost: number;
  isFavorite: boolean;
}

export { Point, Dates, Offer, Photo };