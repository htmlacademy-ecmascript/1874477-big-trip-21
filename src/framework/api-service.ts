interface ApiConfig {
	url: string;
	method: string;
	body: string | null;
	headers: Headers | undefined;
}

export default class ApiService {
  _endPoint: string;
  _authorization: string;
  /**
   * @param {string} endPoint Адрес сервера
   * @param {string} authorization Авторизационный токен
   */
  constructor(endPoint: string, authorization: string) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  /**
   * Метод для отправки запроса к серверу
   * @param {Object} config Объект с настройками
   * @param {string} config.url Адрес относительно сервера
   * @param {string} [config.method] Метод запроса
   * @param {string} [config.body] Тело запроса
   * @param {Headers} [config.headers] Заголовки запроса
   * @returns {Promise<Response>}
   */
  async _load(config: ApiConfig): Promise<Response | undefined> {
    const { url, method = 'GET', body = null, headers = new Headers() } = config;

    if (headers) {
      headers.append('Authorization', this._authorization);
    }

    const response = await fetch(
      `${this._endPoint}/${url}`,
      { method, body, headers },
    );

    try {
      ApiService.checkStatus(response);
      return response;
    } catch (err) {
      if (err instanceof Error) {
        ApiService.catchError(err);
      }
    }
  }

  /**
   * Метод для обработки ответа
   * @param {Response} response Объект ответа
   * @returns {Promise}
   */
  static parseResponse(response: Response) {
    return response.json();
  }

  /**
   * Метод для проверки ответа
   * @param {Response} response Объект ответа
   */
  static checkStatus(response: Response) {
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  }

  /**
   * Метод для обработки ошибок
   * @param {Error} err Объект ошибки
   */
  static catchError(err: Error) {
    throw err;
  }

}

