/* eslint-disable @typescript-eslint/no-explicit-any */
import { FilterType, UpdateType } from '../types-ts';
import { Point } from '../types-ts';

type ObserverCallback = (event: UpdateType, payload?: any) => void;

export default class Observable {
	#observers = new Set<ObserverCallback>();

	addObserver(observer: ObserverCallback) {
		this.#observers.add(observer);
	}

	removeObserver(observer: ObserverCallback) {
		this.#observers.delete(observer);
	}

	_notify(event: UpdateType, payload?: Point | FilterType) {
		this.#observers.forEach((observer) => observer(event, payload));
	}
}
