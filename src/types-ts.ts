type UserAction = 'UPDATE_POINT' | 'ADD_POINT' | 'DELETE_POINT';

type UpdateType = 'PATCH' | 'MINOR' | 'MAJOR' | 'INIT' | 'INIT_FAIL';

type FilterType = 'everything' | 'future' | 'present' | 'past';

type SortType = 'sort-price' | 'sort-time' | 'sort-day';

interface Destination {
	id: string;
	description: string;
	name: string;
	pictures: Picture[];
}

interface Picture {
	src: string;
	description: string;
}
interface Offer {
	type: string;
	offers: OfferItem[];
}

interface OfferItem {
	id: string;
	title: string;
	price: number;
}

interface OfferForPoint {
	id: string;
}

interface Point {
	id?: string;
	type: string;
	destination: Destination | string;
	dateFrom: string;
	date_from?: string;
	dateTo: string;
	date_to?: string;
	offers: string[];
	cost: number;
	base_price?: number;
	isFavorite: boolean;
	is_favorite?: boolean;
}

interface AdaptedPoint {
	id?: string;
	type: string;
	destination: Destination | string;
	offers: string[];
	base_price: number;
	cost?: number;
	date_from: string;
	dateFrom?: string;
	date_to: string;
	dateTo?: string;
	is_favorite: boolean;
	isFavorite?: boolean;
}

export { Point, AdaptedPoint, Destination, Picture, Offer, OfferItem, OfferForPoint, UserAction, UpdateType, FilterType, SortType };
