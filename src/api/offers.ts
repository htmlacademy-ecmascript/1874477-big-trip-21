import ApiService from '../framework/api-service';

export default class OffersApiService extends ApiService {
	get offers() {
		return this._load({ method: 'GET', url: 'offers', body: null, headers: new Headers() })
			.then((response: Response | undefined) => {
				if (response) {
					return ApiService.parseResponse(response);
				}
				throw new Error('Invalid response');
			});
	}
}
