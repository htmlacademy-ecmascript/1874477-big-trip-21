import Observable from '../framework/observable';
import { Offer } from '../types-ts';
import OffersApiService from '../api/offers-api';

export default class OffersModel extends Observable {
	#offersApiService: OffersApiService;
	#offers: Offer[] = [];

	constructor({ offersApiService }: { offersApiService: OffersApiService }) {
		super();
		this.#offersApiService = offersApiService;

		this.#offersApiService.offers.then((offers: Offer[]) => {
			this.#offers = offers;
		});
	}

	get offers() {
		return this.#offers;
	}

	async init() {
		this.#offers = await this.#offersApiService!.offers;
		return this.#offers;
	}

	getTotalPriceOffers(type: string, offers: string[]) {
		let totalPriceOffers = 0;
		const offerId = new Set(offers);
		const offersByType = this.#offers.find((offer) => offer.type === type);
		if (offersByType === undefined) {
			return totalPriceOffers;
		}
		for (const offer of offersByType.offers) {
			if (offerId.has(offer.id)) {
				totalPriceOffers += offer.price;
			}
		}
		return totalPriceOffers;
	}
}
