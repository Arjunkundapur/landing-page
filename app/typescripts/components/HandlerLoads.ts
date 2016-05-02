/// <reference path="../definitions/greensock/greensock.d.ts" />
/// <reference path="../definitions/jquery/jquery.d.ts" />

/// <reference path="ImagesPreload.ts"/>

module app.components {

    import ImagesPreload = app.components.ImagesPreload;

    interface ISelector$$ {
        container: JQuery;
        bar: JQuery;
        logo: JQuery;
    }

    export class HandlerLoads {
        private ImagesPreload: ImagesPreload;
        private images: Array<any> = [];
        private $$Selector = <ISelector$$>{};

        private tl: TimelineLite;

        constructor() {

            this.ImagesPreload = new ImagesPreload();
        }

        init() {

            this
                .cacheElements()
                .bindings();
        }

        open(): JQueryPromise<{}> {

            var defer = $.Deferred();

            this.ImagesPreload
                .proccessImages(this.images)
                .progress( (progress:any) => { this.animateBar(progress); })
                .done(     ()         => { this.close().done( () => { defer.resolve(); }); 
                });

            return defer.promise();
        }

        private cacheElements(): this {
            

            this.$$Selector.container = $('#js-main-loader');
            this.$$Selector.bar = $('#js-main-loader__bar');
            this.$$Selector.logo = $('#js-main-loader__fiat-logo');

            $('body').find('[data-load]').each( (index, value: any) => {
                this
                    .images
                    .push( $( value ).data('load') );
            } );

            this.tl = new TimelineLite({ paised: true });

            return this;
        }

        private bindings(): this {
            

            return this;
        }

        private close(): JQueryPromise<{}> {

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

        private animateBar( percent: number = 1 ): void {
            
            TweenMax.killTweensOf(this.$$Selector.bar);
            TweenLite.to(this.$$Selector.bar, 0.25, { ease: Cubic.easeOut, width: (percent * 100) + '%' });
        }
    }
}
