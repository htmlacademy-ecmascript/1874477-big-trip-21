import {createElement} from '../render';
import './abstract-view.css';

type shakeCallback = () => void;

/** @const {string} Класс, реализующий эффект "покачивания головой" */
const SHAKE_CLASS_NAME: string = 'shake';

/** @const {number} Время анимации в миллисекундах */
const SHAKE_ANIMATION_TIMEOUT: number = 600;

/**
 * Абстрактный класс представления
 */
export default class AbstractView<El extends HTMLElement = HTMLElement> {
	#element: El | null = null;

	constructor() {
		if (new.target === AbstractView) {
			throw new Error('Can\'t instantiate AbstractView, only concrete one.');
		}
	}

	/**
   * Геттер для получения элемента
   * @returns {HTMLElement} Элемент представления
   */
	get element() {
		if (!this.#element) {
			this.#element = createElement<El>(this.template);
		}

		return this.#element;
	}

	/**
   * Геттер для получения разметки элемента
   * @abstract
   * @returns {string} Разметка элемента в виде строки
   */
	get template(): string {
		throw new Error('Abstract method not implemented: get template');
	}

	/** Метод для удаления элемента */
	removeElement() {
		this.#element = null;
	}

	/**
   * Метод, реализующий эффект "покачивания головой"
   * @param {shakeCallback} [callback] Функция, которая будет вызвана после завершения анимации
   */
	shake(callback: shakeCallback) {
		this.element.classList.add(SHAKE_CLASS_NAME);
		setTimeout(() => {
			this.element.classList.remove(SHAKE_CLASS_NAME);
			callback?.();
		}, SHAKE_ANIMATION_TIMEOUT);
	}
}

/**
 * Функция, которая будет вызвана методом shake после завершения анимации
 * @callback shakeCallback
 */
