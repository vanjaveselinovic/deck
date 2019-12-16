$(document).ready(() => {
	let dragging = false;
	let currentCardElement;
	let bottomBarElement;
	const startCardPosition = {
		x: 0,
		y: 0,
	};
	const startTouchPosition = {
		x: 0,
		y: 0,
	};
	const prevTouchPosition = {
		x: 0,
		y: 0,
	};
	const currTouchPosition = {
		x: 0,
		y: 0,
	};

	const cardElements = $('.card-container');
	let index = cardElements.length - 1;

	$(cardElements[index]).addClass('current');

	$('.card-container').on('touchstart', (e) => {
		currentCardElement = e.delegateTarget;
		bottomBarElement = currentCardElement.querySelector('.bottom-bar');
		$(currentCardElement).addClass('dragging');

		startCardPosition.x = currentCardElement.offsetLeft;
		startCardPosition.y = currentCardElement.offsetTop;

		startTouchPosition.x = e.touches[0].clientX;
		startTouchPosition.y = e.touches[0].clientY;
		
		dragging = true;
	});

	$('.card-container').on('touchmove', (e) => {
		if (dragging && currentCardElement) {
			prevTouchPosition.x = currTouchPosition.x;
			prevTouchPosition.y = currTouchPosition.y;

			currTouchPosition.x = e.touches[0].clientX;
			currTouchPosition.y = e.touches[0].clientY;

			currentCardElement.style.left = (startCardPosition.x + currTouchPosition.x - startTouchPosition.x) + 'px';
			currentCardElement.style.top = (startCardPosition.y + currTouchPosition.y - startTouchPosition.y) + 'px';

			bottomBarElement.style.opacity = Math.min(1 - ((Math.abs(currTouchPosition.x - startTouchPosition.x) + Math.abs(currTouchPosition.y - startTouchPosition.y))/2) / 100, 1);
		}
	})

	$('.card-container').on('touchend', () => {
		if (Math.abs(currTouchPosition.x - prevTouchPosition.x) > 5 || Math.abs(currTouchPosition.y - prevTouchPosition.y) > 5) {
			$(currentCardElement).animate({
				left: currentCardElement.offsetLeft + (window.innerWidth * (currTouchPosition.x - prevTouchPosition.x)),
				top: currentCardElement.offsetTop + (window.innerHeight * (currTouchPosition.y - prevTouchPosition.y)),
			}, 500, () => {
				$(currentCardElement).addClass('done');
			});
			$(currentCardElement).removeClass('current');
			index--;
			$(cardElements[index]).addClass('current');
		} else {
			$(currentCardElement).animate({
				top: 0,
				left: 0,
			}, 100, () => {
				$(currentCardElement).removeClass('dragging');
			});
			bottomBarElement.style.opacity = 1;
		}
		dragging = false;
	});
});