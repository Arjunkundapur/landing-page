/// <reference path="../definitions/greensock/greensock.d.ts" />
/// <reference path="../definitions/jquery/jquery.d.ts" />

module app.components {

    export class Parallax {

        private $context: JQuery;
        private $item: JQuery;

        private W_H: number;
        private H_H: number;

        constructor(context: JQuery) {

            this.$context = context;
            this.$item = $("[data-distance]", this.$context);
        }

        bind(): void {

            this.$context
                .on("mousemove.pr", this.onMousemove.bind(this))
                .on("resize.pr", this.updateBoundries.bind(this));

            this.updateBoundries();
        }

        unbind(): void {

            this.$context
                .unbind("mousemove.pr")
                .unbind("resize.pr");

            this.$context = null;
            this.$item = null;
        }

        private onMousemove(e: JQueryKeyEventObject): void {

            var x = e.pageX - this.W_H;
            var y = e.pageY - this.H_H;
            for (var i = 0; i < this.$item.length; i++) {

                var distance = $(this.$item[i]).data("distance");
                TweenMax.to(this.$item[i], 0.15, { x: x * Number(distance[0]), y: y * Number(distance[1]) });
            }
        }

        private updateBoundries(): void {

            this.W_H = (window.innerWidth / 2);
            this.H_H = (window.innerHeight / 2);
        }
    }
}