this.LaseRun = this.LaseRun || {};

(function(undefined) {
    "use strict";

    var SkylandState = function() {
        this.objects = {};
        this._cachedValues = {};
    }

    LaseRun.extend(SkylandState, LaseRun.GameState);

    var p = SkylandState.prototype;

    p.preload = function() {
        var assets = LaseRun.path.assets;
        this.load.image("skyland/map/sky", assets.common.child("textures/blueSky.png"));
        this.load.image("skyland/map/tiles", assets.common.child("textures/kennyTiles.png"));
        this.load.image("skyland/chars/redBall", assets.common.child("chars/redBall.png"));

        this.load.tilemap("skyland/map", assets.level.child("skyland/map.json"), null, Phaser.Tilemap.TILED_JSON);
        this.load.text("skyland/map/rules", assets.level.child("skyland/rules.json"));
    }

    p.create = function() {
        this.objects["cursors"] = this.input.keyboard.createCursorKeys();

        var rules = JSON.parse(this.cache.getText("skyland/map/rules"));

        var physicsType = this._cachedValues["physicsType"] = rules["physics"]["type"];

        this.physics.startSystem(Phaser.Physics[physicsType.toUpperCase()]);

        var map = this.map = this.add.tilemap("skyland/map");
        map.addTilesetImage("tiles", "skyland/map/tiles");
        map.addTilesetImage("sky", "skyland/map/sky");

        var sky = this.objects["sky"] = map.createLayer("sky");
        var ground = this.objects["ground"] = map.createLayer("tiles");
        
        map.setCollision(rules["map"]["layers"]["tiles"]["collisions"], true, ground);
        ground.resizeWorld();

        var redBall = this.objects["redBall"] = this.add.sprite(map.tileWidth * 2, map.heightInPixels - map.tileWidth * 5, "skyland/chars/redBall");
        (function() {
            var size = rules["char"]["size"];
            redBall.scale.setTo(size["width"] / redBall.texture.width, size["height"] / redBall.texture.height);
        })();

        this.physics.enable(redBall);

        LaseRun.property.apply(redBall.body, rules["char"]["body"]);
        delete rules["physics"]["type"];
        LaseRun.property.apply(this.physics[physicsType.toLowerCase()], rules["physics"]);
        
        this.camera.x = 0;
        this.camera.y = map.heightInPixels;

        this.camera.follow(redBall);
        var init = rules["char"]["movement"];
        applyMovement(this._cachedValues, rules["char"]["movement"]);
        var checkpoints = this.objects["checkpoints"] = rules["map"]["checkpoints"];
        this._cachedValues["currentCheckpoint"] = checkpoints[0];
        this._cachedValues["currentCheckpointIndex"] = 0;
    }

    var applyMovement = function(obj, json) {
        var dvdt = json["acceleration"];
        var v = json["velocity"];

        if (dvdt) {
            obj["acceleration"] = dvdt;
        }
        if (v) {
            obj["velocity"] = v;
        }
    }

    p.update = function() {
        var redBall = this.objects["redBall"];
        this.physics[this._cachedValues["physicsType"]].collide(redBall, this.objects["ground"]);
        
        var cursors = this.objects["cursors"];

        var currentCheckpointIndex = this._cachedValues["currentCheckpointIndex"];

        var currentCheckpoint = this._cachedValues["currentCheckpoint"];;
        if (currentCheckpoint) {
            if (redBall.body.x >= currentCheckpoint["distance"] * this.map.tileWidth) {
                applyMovement(this._cachedValues, currentCheckpoint);
                var bodyRules = currentCheckpoint["body"];
                if (bodyRules) {
                    LaseRun.property.apply(redBall.body, bodyRules);
                }
                this._cachedValues["currentCheckpoint"] = this.objects["checkpoints"][++this._cachedValues["currentCheckpointIndex"]];
            }
        }

        redBall.body.velocity.x = this._cachedValues["velocity"];
        if (cursors.up.isDown) {
            redBall.body.velocity.y -= this._cachedValues["acceleration"];
        }
    }

    p.render = function() {
    }

    LaseRun.SkylandState = SkylandState;

})();