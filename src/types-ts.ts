interface Destination {
  id: string;
  name: string;
  description: string;
  photos: {
    src: string;
    alt: string;
  }[]
}
interface Offer {
  id: string;
  checked: boolean;
  name: string;
  cost: number;
}

type Offers = {
  [key: string]: Offer[];
};

interface Photo {
  src: string;
  alt: string;
}
interface Point {
  id?: string;
  type: string;
  destination: Destination;
  dateFrom: string;
  dateTo: string;
  offers: Offer[];
  cost: number;
  isFavorite: boolean;
}

export { Point, Destination, Offer, Photo, Offers };
