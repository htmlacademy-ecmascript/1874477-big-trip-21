/* eslint-disable @typescript-eslint/no-explicit-any */
import { FilterType, UpdateType } from '../types-ts';
import { Point } from '../types-ts';

type ObserverCallback = (event: UpdateType, payload?: any) => void;
/**
 * Класс, реализующий паттерн Наблюдатель.
 */
export default class Observable {
	/** @type {Set<ObserverCallback>} Множество функций типа observerCallback */
	#observers = new Set<ObserverCallback>();

	/**
   * Метод, позволяющий подписаться на событие
   * @param {ObserverCallback} observer Функция, которая будет вызвана при наступлении события
   */
	addObserver(observer: ObserverCallback) {
		this.#observers.add(observer);
	}

	/**
   * Метод, позволяющий отписаться от события
   * @param {ObserverCallback} observer Функция, которую больше не нужно вызывать при наступлении события
   */
	removeObserver(observer: ObserverCallback) {
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
 * @callback ObserverCallback
 * @param {*} event Тип события
 * @param {*} [payload] Дополнительная информация
 */
