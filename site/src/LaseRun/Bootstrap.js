this.LaseRun = this.LaseRun || {};

(function(undefined) {
    "use strict";

    var Bootstrap = {};

    var s = Bootstrap;

    s.run = function(GAMEDIV, VIEWPORT_X, VIEWPORT_Y, COMMON_DIR, LEVEL_DIR) {

        var path = LaseRun.path;

        path.assets.common = path.getPath(COMMON_DIR);
        path.assets.level = path.getPath(LEVEL_DIR);

        var preload = function() {
        }

        var create = function() {
            LaseRun.game.state.add("SkylandState", new LaseRun.SkylandState());

            LaseRun.game.state.start("SkylandState");
        }

        var update = function() {
        }

        var render = function() {
        }

        LaseRun.game = new Phaser.Game(
            VIEWPORT_X, 
            VIEWPORT_Y, 
            Phaser.CANVAS, 
            GAMEDIV, 
            {
                preload: preload, 
                create: create, 
                update: update,
                render: render
            }
        );
    }

    LaseRun.Bootstrap = Bootstrap;

})();