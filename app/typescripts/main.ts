/// <reference path="definitions/jquery/jquery.d.ts" />

/// <reference path="components/Parallax.ts" />


import Parallax = app.components.Parallax;

$('document').ready(() => {


	var parallax = new Parallax($('.main-wrapper'));
	parallax.bind();
});