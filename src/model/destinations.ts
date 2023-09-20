import DestinationsApiService from '../api/destinations';
import Observable from '../framework/observable';
import { Destination } from '../types-ts';

export default class DestinationsModel extends Observable {
	#destinationsApiService: DestinationsApiService;
	#destinations: Destination[] = [];

	constructor({ destinationsApiService }: { destinationsApiService: DestinationsApiService }) {
		super();
		this.#destinationsApiService = destinationsApiService;
	}

	get destinations() {
		return this.#destinations;
	}

	get destinationsName() {
		return this.#destinations.map((destination) => destination.name);
	}

	async init() {
		this.#destinations = await this.#destinationsApiService!.destinations;
	}

}
