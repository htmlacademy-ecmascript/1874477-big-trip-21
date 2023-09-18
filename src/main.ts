import DestinationsApiService from './api/destinations-api';
import OffersApiService from './api/offers-api';
import PointsApiService from './api/points-api';
import DestinationsModel from './model/destinations';
import OffersModel from './model/offers';
import PointsModel from './model/points';
import FilterModel from './model/filter';
import TripPresenter from './presenter/trip';
import FilterPresenter from './presenter/filter';
import { API_POINT, AUTHORIZATION } from './const';

const infoContainer = document.querySelector<HTMLDivElement>('.trip-main')!;
const tripContainer = document.querySelector<HTMLDivElement>('.trip-events')!;

const pointsModel = new PointsModel({pointsApiService: new PointsApiService(API_POINT, AUTHORIZATION)});
const offersModel = new OffersModel({offersApiService: new OffersApiService(API_POINT, AUTHORIZATION) });
const destinationsModel = new DestinationsModel({destinationsApiService: new DestinationsApiService(API_POINT, AUTHORIZATION)});
const filterModel = new FilterModel();
const filterPresenter = new FilterPresenter({
	filterContainer: infoContainer,
	pointsModel: pointsModel,
	filterModel: filterModel });
const tripPresenter = new TripPresenter({
	infoContainer: infoContainer,
	tripContainer: tripContainer,
	pointsModel: pointsModel,
	offersModel: offersModel,
	destinationsModel: destinationsModel,
	filterModel: filterModel
});

filterPresenter.init();
tripPresenter.init();
