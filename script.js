$(document).ready(() => {
	$('.card').on('click', (e) => {
		console.log($(e.target).slideUp(200));
	});
});