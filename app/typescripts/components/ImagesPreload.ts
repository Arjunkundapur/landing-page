/// <reference path="../definitions/jquery/jquery.d.ts" />

module app.components {

    export class ImagesPreload {

        proccessImages(images: Array<string> = []): JQueryPromise<{}> {
            
            var defer = $.Deferred();

            if( images.length <= 0 ){ defer.resolve(); } 
            else{

                var percentageComplete = 0;

                for (var index = 0; index < images.length; index++) {
                    var src = images[index];

                    var img = new Image();
                    img.src = src;
                    img.onload = () => {

                        percentageComplete++;
                        defer.notify(percentageComplete/images.length);

                        if (percentageComplete >= images.length) {
                            defer.resolve();
                        }
                    };
                    img.onerror = () => {

                        percentageComplete++;
                        defer.notify(percentageComplete/images.length);
                        if (percentageComplete >= images.length) {

                            defer.resolve();
                        }
                    }
                }
            }

            return defer.promise();
        }

    }
}



