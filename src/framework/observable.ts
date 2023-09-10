import { FilterType, UpdateType } from '../types-ts';
import { Point } from '../types-ts';

type observerCallback = (event: UpdateType, payload?: Point | FilterType) => void;
/**
 * Класс, реализующий паттерн Наблюдатель.
 */
export default class Observable {
	/** @type {Set<observerCallback>} Множество функций типа observerCallback */
	#observers = new Set<observerCallback>();

	/**
   * Метод, позволяющий подписаться на событие
   * @param {observerCallback} observer Функция, которая будет вызвана при наступлении события
   */
	addObserver(observer: observerCallback) {
		this.#observers.add(observer);
	}

	/**
   * Метод, позволяющий отписаться от события
   * @param {observerCallback} observer Функция, которую больше не нужно вызывать при наступлении события
   */
	removeObserver(observer: observerCallback) {
		this.#observers.delete(observer);
	}

	/**
   * Метод для оповещения подписчиков о наступлении события
   * @param {*} event Тип события
   * @param {*} payload Дополнительная информация
   */
	_notify(event: UpdateType, payload?: Point | FilterType) {
		this.#observers.forEach((observer) => observer(event, payload));
	}
}

/**
 * Функция, которая будет вызвана при наступлении события
 * @callback observerCallback
 * @param {*} event Тип события
 * @param {*} [payload] Дополнительная информация
 */
