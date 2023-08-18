import './ui-blocker';

interface UiBlockerConfig {
  lowerLimit: number;
  upperLimit: number;
}
/**
 * Класс для блокировки интерфейса
 */
export default class UiBlocker {
	/** @type {number} Время до блокировки интерфейса в миллисекундах */
	#lowerLimit: number;

	/** @type {number} Минимальное время блокировки интерфейса в миллисекундах */
	#upperLimit: number;

	/** @type {HTMLElement|null} Элемент, блокирующий интерфейс */
	#element : HTMLElement;

	/** @type {number} Время вызова метода block */
	#startTime: number = 0;

	/** @type {number} Время вызова метода unblock */
	#endTime: number = 0;

	/** @type {number} Идентификатор таймера */
	#timerId: ReturnType<typeof setTimeout> | null = null;

	/**
   * @param {Object} config Объект с настройками блокировщика
   * @param {number} config.lowerLimit Время до блокировки интерфейса в миллисекундах. Если вызвать метод unblock раньше, то интерфейс заблокирован не будет
   * @param {number} config.upperLimit Минимальное время блокировки в миллисекундах. Минимальная длительность блокировки
   */
	constructor({lowerLimit, upperLimit}: UiBlockerConfig) {
		this.#lowerLimit = lowerLimit;
		this.#upperLimit = upperLimit;

		this.#element = document.createElement('div');
		this.#element.classList.add('ui-blocker');
		document.body.append(this.#element);
	}

	/** Метод для блокировки интерфейса */
	block() {
		this.#startTime = Date.now();
		this.#timerId = setTimeout(() => {
			this.#addClass();
		}, this.#lowerLimit);
	}

	/** Метод для разблокировки интерфейса */
	unblock() {
		this.#endTime = Date.now();
		const duration = this.#endTime - this.#startTime;

		if (duration < this.#lowerLimit) {
			if (this.#timerId !== null) {
				clearTimeout(this.#timerId);
				this.#timerId = null;
			}
			return;
		}

		if (duration >= this.#upperLimit) {
			this.#removeClass();
			return;
		}

		if (this.#timerId !== null) {
			clearTimeout(this.#timerId);
			this.#timerId = null;
		}

		this.#timerId = setTimeout(this.#removeClass, this.#upperLimit - duration);
	}

	/** Метод, добавляющий CSS-класс элементу */
	#addClass = () => {
		this.#element.classList.add('ui-blocker--on');
	};

	/** Метод, убирающий CSS-класс с элемента */
	#removeClass = () => {
		this.#element.classList.remove('ui-blocker--on');
	};
}
