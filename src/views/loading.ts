import AbstractView from '../framework/view/abstract-view';

const NoPointText = '<p class="board__no-tasks">Loading...</p>';

function createNoPointTemplate() {
	return NoPointText;
}

export default class LoadingView extends AbstractView {
	get template() {
		return createNoPointTemplate();
	}
}
