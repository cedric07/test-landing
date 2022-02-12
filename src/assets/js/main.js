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
		APP.aos.init();
		APP.menu.init();
		APP.menu.sticky();
		APP.menu.menuActions();
		APP.blockCards.cardsSwiper();
	},
	onResize: function () {
		/** onResize function */
		$(window).on('resize orientationchange', function () {
			APP.menu.init();
		});
	},
	onScroll: function () {
		/** Scroll function */
		$(window).on('scroll', function () {
			APP.menu.sticky();
		});
	}
};

APP.aos = {
	init: function () {
		AOS.init({
			// Global settings:
			disable: 'phone', // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
			startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
			initClassName: 'aos-init', // class applied after initialization
			animatedClassName: 'aos-animate', // class applied on animation
			useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
			disableMutationObserver: false, // disables automatic mutations' detections (advanced)
			debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
			throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

			// Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
			offset: 120, // offset (in px) from the original trigger point
			delay: 0, // values from 0 to 3000, with step 50ms
			duration: 500, // values from 0 to 3000, with step 50ms
			easing: 'ease-in-out', // default easing for AOS animations
			once: true, // whether animation should happen only once - while scrolling down
			mirror: false, // whether elements should animate out while scrolling past them
			anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
		});
	}
};

APP.menu = {
	burger: $(),
	nav: $(),
	submenu: $(),
	item: $(),
	header: $(),

	init: function () {
		this.burger = $('.burger-menu');
		this.nav = $('.header__navs .nav');

		if (window.matchMedia("(min-width: " + APP.pref.screen_lg + "px)").matches) {
			// Reset mobile menu
			$('body').removeClass('menu-mobile-open');
			APP.menu.burger.removeClass('open');
		}
	},

	sticky: function() {
		this.header = $('.header');

		if ($(window).scrollTop() > 20) {
			APP.menu.header.addClass('is-sticky');
		} else {
			APP.menu.header.removeClass('is-sticky');
		}
	},

	menuActions: function () {
		this.burger = $('.burger-menu');

		// Open menu mobile
		APP.menu.burger.click(function () {
			$(this).toggleClass('open');
			$('body').toggleClass('menu-mobile-open');
		});
	}
};

APP.blockCards = {
	cardsSwiper: function () {
		var swiper = '.block--cards__swiper';
		var sliders = [];

		$(swiper).each(function (index, element) {
			var swiperClass = swiper + '-' + index;

			$(this).addClass(swiperClass.split('.').join(""));

			var nbrSlides = $(swiperClass + ' .swiper-slide').length;

			var swiperBlockCards = new Swiper(swiperClass, {
				loop: nbrSlides > 1,
				slidesPerView: 1,
				slidesPerGroup: 1,
				spaceBetween: 32,
				watchOverflow: true,
				setWrapperSize: true,
				roundLengths: true,
				watchSlidesProgress: true,
				breakpoints: {
					576: {
						loop: nbrSlides > 2,
						slidesPerView: 2,
						slidesPerGroup: 2,
					},
					768: {
						loop: nbrSlides > 3,
						slidesPerView: 3,
						slidesPerGroup: 3,
					}
				},
				pagination: {
					el: swiperClass + ' .swiper-pagination',
					type: 'bullets',
					clickable: true
				}
			});

			sliders.push(swiperBlockCards);
		});
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
