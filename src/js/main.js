var APP = APP || {};

APP.pref = {
	screen_xxl: 1400,
	screen_xxl_down: 1399.98,
	screen_xl: 1200,
	screen_xl_down: 1199.98,
	screen_lg: 992,
	screen_lg_down: 991.98,
	screen_md: 768,
	screen_md_down: 767.98,
	screen_sm: 576,
	screen_sm_down: 575.98
};

$(document).ready(function () {
	APP.global.init();
	APP.global.onResize();
	APP.global.onScroll();
});

APP.global = {
	init: function () {
		/** init function */
		APP.exemple.init();
	},
	onResize: function () {
		/** onResize function */
		$(window).on('resize orientationchange', function () {

		});
	},
	onScroll: function () {
		/** Scroll function */
		$(window).on('scroll', function () {

		});
	}
};

APP.exemple = {
	exempleVar: $(),

	init: function () {
		this.exempleVar = $('.myClass');

		APP.exemple.exempleVar.hide();
	}
};

/**
 * Is in Viewport
 *
 * Usage :
 *
 * if ($('#Something').isInViewport()) {
 *     // do something
 * } else {
 *     // do something else
 * }
 *
 * @returns {boolean}
 */
$.fn.isInViewport = function () {
	var elementTop = $(this).offset().top;
	var elementBottom = elementTop + $(this).outerHeight();

	var viewportTop = $(window).scrollTop();
	var viewportBottom = viewportTop + $(window).height();

	return elementBottom > viewportTop && elementTop < viewportBottom;
};
