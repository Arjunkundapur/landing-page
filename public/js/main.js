/// <reference path="../definitions/greensock/greensock.d.ts" />
/// <reference path="../definitions/jquery/jquery.d.ts" />
var app;
(function (app) {
    var components;
    (function (components) {
        class Parallax {
            constructor(context) {
                this.$context = context;
                this.$item = $("[data-distance]", this.$context);
            }
            bind() {
                this.$context
                    .on("mousemove.pr", this.onMousemove.bind(this))
                    .on("resize.pr", this.updateBoundries.bind(this));
                this.updateBoundries();
            }
            unbind() {
                this.$context
                    .unbind("mousemove.pr")
                    .unbind("resize.pr");
                this.$context = null;
                this.$item = null;
            }
            onMousemove(e) {
                var x = e.pageX - this.W_H;
                var y = e.pageY - this.H_H;
                for (var i = 0; i < this.$item.length; i++) {
                    var distance = $(this.$item[i]).data("distance");
                    TweenMax.to(this.$item[i], 0.15, { x: x * Number(distance[0]), y: y * Number(distance[1]) });
                }
            }
            updateBoundries() {
                this.W_H = (window.innerWidth / 2);
                this.H_H = (window.innerHeight / 2);
            }
        }
        components.Parallax = Parallax;
    })(components = app.components || (app.components = {}));
})(app || (app = {}));
/// <reference path="../definitions/jquery/jquery.d.ts" />
var app;
(function (app) {
    var components;
    (function (components) {
        class ImagesPreload {
            proccessImages(images = []) {
                var defer = $.Deferred();
                if (images.length <= 0) {
                    defer.resolve();
                }
                else {
                    var percentageComplete = 0;
                    for (var index = 0; index < images.length; index++) {
                        var src = images[index];
                        var img = new Image();
                        img.src = src;
                        img.onload = () => {
                            percentageComplete++;
                            defer.notify(percentageComplete / images.length);
                            if (percentageComplete >= images.length) {
                                defer.resolve();
                            }
                        };
                        img.onerror = () => {
                            percentageComplete++;
                            defer.notify(percentageComplete / images.length);
                            if (percentageComplete >= images.length) {
                                defer.resolve();
                            }
                        };
                    }
                }
                return defer.promise();
            }
        }
        components.ImagesPreload = ImagesPreload;
    })(components = app.components || (app.components = {}));
})(app || (app = {}));
/// <reference path="../definitions/greensock/greensock.d.ts" />
/// <reference path="../definitions/jquery/jquery.d.ts" />
/// <reference path="ImagesPreload.ts"/>
var app;
(function (app) {
    var components;
    (function (components) {
        var ImagesPreload = app.components.ImagesPreload;
        class HandlerLoads {
            constructor() {
                this.images = [];
                this.$$Selector = {};
                this.ImagesPreload = new ImagesPreload();
            }
            init() {
                this
                    .cacheElements()
                    .bindings();
            }
            open() {
                var defer = $.Deferred();
                this.ImagesPreload
                    .proccessImages(this.images)
                    .progress((progress) => { this.animateBar(progress); })
                    .done(() => {
                    this.close().done(() => { defer.resolve(); });
                });
                return defer.promise();
            }
            cacheElements() {
                this.$$Selector.container = $('#js-main-loader');
                this.$$Selector.bar = $('#js-main-loader__bar');
                this.$$Selector.logo = $('#js-main-loader__fiat-logo');
                $('body').find('[data-load]').each((index, value) => {
                    this
                        .images
                        .push($(value).data('load'));
                });
                this.tl = new TimelineLite({ paised: true });
                return this;
            }
            bindings() {
                return this;
            }
            close() {
                var defer = $.Deferred();
                TweenMax.killTweensOf(this.$$Selector.bar);
                TweenLite.to(this.$$Selector.bar, 0.25, { width: '100%', ease: Cubic.easeOut, onComplete: () => {
                        TweenLite.to(this.$$Selector.bar, 0.75, { opacity: 0, ease: Cubic.easeOut });
                        TweenLite.to(this.$$Selector.logo, 0.75, { top: '150px', ease: Cubic.easeOut, onComplete: () => {
                                TweenLite.to(this.$$Selector.container, 0.25, { opacity: 0, onComplete: () => {
                                        TweenLite.to(this.$$Selector.container, 0.25, { top: '-100%', onComplete: () => {
                                                defer.resolve();
                                            } });
                                    } });
                            } });
                    } });
                return defer.promise();
            }
            animateBar(percent = 1) {
                TweenMax.killTweensOf(this.$$Selector.bar);
                TweenLite.to(this.$$Selector.bar, 0.25, { ease: Cubic.easeOut, width: (percent * 100) + '%' });
            }
        }
        components.HandlerLoads = HandlerLoads;
    })(components = app.components || (app.components = {}));
})(app || (app = {}));
/// <reference path="definitions/jquery/jquery.d.ts" />
/// <reference path="components/Parallax.ts" />
/// <reference path="components/HandlerLoads.ts" />
var Parallax = app.components.Parallax;
var HandlerLoads = app.components.HandlerLoads;
$('document').ready(() => {
    var handlerLoads = new HandlerLoads();
    var parallax = new Parallax($('.main-wrapper'));
    handlerLoads.init();
    handlerLoads
        .open()
        .then(() => { parallax.bind(); });
});
//# sourceMappingURL=main.js.map