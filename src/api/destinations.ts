import ApiService from '../framework/api-service';

export default class DestinationsApiService extends ApiService {
	get destinations() {
		return this._load({ method: 'GET', url: 'destinations', body: null, headers: new Headers() })
			.then((response: Response | undefined) => {
				if (response) {
					return ApiService.parseResponse(response);
				}
				throw new Error('Invalid response');
			});
	}
}
