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
/// <reference path="definitions/jquery/jquery.d.ts" />
/// <reference path="components/Parallax.ts" />
var Parallax = app.components.Parallax;
$('document').ready(() => {
    var parallax = new Parallax($('.main-wrapper'));
    parallax.bind();
});
//# sourceMappingURL=main.js.map