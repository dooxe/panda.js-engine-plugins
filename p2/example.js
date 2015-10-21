game.module(
    'game.main'
)
.require(
    'plugins.p2'
)
.body(function() {

game.addAsset('panda.png');

game.createClass('Panda', 'Sprite', {
    texture: 'panda.png',

    init: function(x) {
        this.anchorCenter();

        this.body = new game.Body({
            position: [x, 0],
            mass: 10
        });
        this.body.addShape(new game.Circle({
            radius: this.width / 2
        }));

        game.scene.world.addBody(this.body);
        this.addTo(game.scene.stage);
        this.update();

        game.scene.addTimer(8000, this.remove.bind(this));
    },

    remove: function() {
        this.super();
        this.body.remove();
    },

    update: function() {
        this.position.x = this.body.position[0];
        this.position.y = this.body.position[1];
        this.rotation = this.body.angle;
    }
});

game.createScene('Main', {
    backgroundColor: '#eee',

    init: function() {
        this.world = new game.World({
            gravity: [0, 900]
        });

        var floor = new game.Body({
            position: [game.width / 2, game.height]
        });
        floor.addShape(new game.Box({
            width: game.width,
            height: 100
        }));
        this.world.addBody(floor);

        this.addTimer(500, this.spawnPanda, true, true);
    },

    spawnPanda: function() {
        var panda = new game.Panda(game.width.random());
    }
});

});
