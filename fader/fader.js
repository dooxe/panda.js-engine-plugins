game.module(
    'plugins.fader'
)
.body(function() {
    
game.createClass('Fader', {
    color: '#000',
    container: null,
    fading: false,
    speed: 500,

    init: function(settings) {
        game.merge(this, settings);

        this.container = this.container || game.scene.stage;
        this.sprite = new game.Graphics();
        this.sprite.beginFill(this.color);
        this.sprite.drawRect(0, 0, game.system.width, game.system.height);
    },

    fadeIn: function(callback) {
        this.stop();

        this.callback = callback;
        if (this.sprite.alpha === 0) this.sprite.alpha = 1;
        this.sprite.addTo(this.container);

        this.tween = new game.Tween(this.sprite);
        this.tween.to({ alpha: 0 }, this.speed);
        this.tween.onComplete(this.fadeComplete.bind(this, true));
        this.tween.start();

        this.fading = true;
    },

    fadeOut: function(callback) {
        this.stop();

        this.callback = callback;
        if (this.sprite.alpha === 1) this.sprite.alpha = 0;
        this.sprite.addTo(this.container);

        this.tween = new game.Tween(this.sprite);
        this.tween.to({ alpha: 1 }, this.speed);
        this.tween.onComplete(this.fadeComplete.bind(this));
        this.tween.start();

        this.fading = true;
    },

    fadeComplete: function(remove) {
        this.fading = false;
        this.tween = null;
        if (typeof this.callback === 'function') this.callback();
        if (remove) this.sprite.remove();
    },

    stop: function() {
        if (!this.tween) return;
        this.tween.stop();
        this.tween = null;
    }
});

});
