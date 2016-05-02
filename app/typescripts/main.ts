/// <reference path="definitions/jquery/jquery.d.ts" />

/// <reference path="components/Parallax.ts" />
/// <reference path="components/HandlerLoads.ts" />


import Parallax = app.components.Parallax;
import HandlerLoads = app.components.HandlerLoads;

$('document').ready(() => {

	var handlerLoads = new HandlerLoads();
	var parallax = new Parallax($('.main-wrapper'));
	handlerLoads.init();
	handlerLoads
		.open()
		.then(() => { parallax.bind(); });
});