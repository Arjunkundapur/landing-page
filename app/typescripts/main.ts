/// <reference path="definitions/jquery/jquery.d.ts" />

/// <reference path="components/Parallax.ts" />
/// <reference path="components/HandlerLoads.ts" />


import Parallax = app.components.Parallax;
import HandlerLoads = app.components.HandlerLoads;

$('document').ready(() => {

	var handlerLoads = new HandlerLoads();
	var parallax = new Parallax($('.main-wrapper'));


	TweenMax.set($('.main-header__a, .main-header__b, .main-header__logo'), { y: 50, opacity: 0 });
	TweenMax.set($('.fold__bg--home'), { y: 100, x: 80, opacity: 0 });
	TweenMax.set($('.header__tit'), { top: 100, opacity: 0 });
	TweenMax.set($('.header__desc'), { top: -100, opacity: 0 });
	TweenMax.set($('#fold__bt-more'), { opacity: 0 });
	var tl = new TimelineMax({ onComplete: () => { parallax.bind(); } });

	tl.staggerTo([
		$('.main-header__logo'),
		$('.main-header__a').eq(0),
		$('.main-header__a').eq(1),
		$('.main-header__a').eq(2),
		$('.main-header__a').eq(3),
		$('.main-header__a').eq(4),
		$('.main-header__b').eq(0),
		$('.main-header__b').eq(1)
	], 0.25, { y: 0, opacity: 1, ease: Cubic.easeOut }, 0.08 );

	tl.to($('.fold__bg--home'), 0.85, { x:0, y: 0, opacity: .2, ease: Cubic.easeOut }, 0);
	tl.to($('.header__tit, .header__desc'), 0.85, { top: 0, opacity: 1, ease: Cubic.easeOut }, '-=.45' );
	tl.to($('#fold__bt-more'), 0.25, { opacity: 1 }, '-=.25');

	tl.pause();


	handlerLoads.init();
	handlerLoads
		.open()
		.then(() => { 
			tl.play();
		});




	$('#fold__bt-more').on('click', () => {

		TweenMax.to($('#js-main-wrapper'), 0.25, { scrollTo: window.innerHeight, ease: Cubic.easeOut })
	});
});