import DestinationsApiService from '../api/destinations-api';
import Observable from '../framework/observable';
import { Destination } from '../types-ts';

export default class DestinationsModel extends Observable {
	#destinationsApiService: DestinationsApiService;
	#destinations: Destination[] = [];

	constructor({ destinationsApiService } : {destinationsApiService: DestinationsApiService}) {
		super();
		this.#destinationsApiService = destinationsApiService;

		this.#destinationsApiService.destinations.then((destinations: Destination[]) => {
			this.#destinations = destinations;
		});
	}

	get destinations() {
		return this.#destinations;
	}

	get destinationsName() {
		return this.#destinations.map((destination) => destination.name);
	}

	async init() {
		this.#destinations = await this.#destinationsApiService!.destinations;
		return this.#destinations;
	}
}
