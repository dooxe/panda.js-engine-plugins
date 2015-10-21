game.module(
	'plugins.webgl.core'
)
.require(
	'engine.renderer.core',
	'plugins.webgl.blendmodemanager',
	'plugins.webgl.shadermanager'
)
.body(function() {

game.glContexts = [];
game.instances = [];
	
game.Renderer.inject({
	webGL: true,

	_initContext: function() {
		var options = {
	        alpha: game.Renderer.transparent,
	        antialias: game.Renderer.antialias, // SPEED UP??
	        premultipliedAlpha: game.Renderer.transparent && game.Renderer.transparent !== 'notMultiplied',
	        stencil: true,
	        preserveDrawingBuffer: game.Renderer.preserveDrawingBuffer
	    };

		var gl = this.context = this.canvas.getContext('webgl', options) || this.view.getContext('experimental-webgl', options);

	    if (!gl) {
	    	this.webGL = false;
	    	this.super();
	    	return;
	    }

	    this.glContextId = gl.id = game.Renderer.glContextId++;

	    game.glContexts[this.glContextId] = gl;

	    gl.disable(gl.DEPTH_TEST);
        gl.disable(gl.CULL_FACE);
        gl.enable(gl.BLEND);

        this.shaderManager = new game.WebGLShaderManager();
        this.spriteBatch = new game.WebGLSpriteBatch();
        this.maskManager = new game.WebGLMaskManager();
        this.filterManager = new game.WebGLFilterManager();
        this.blendModeManager = new game.WebGLBlendModeManager();
        this.stencilManager = new game.WebGLStencilManager();

        this.shaderManager.setContext(gl);
        this.spriteBatch.setContext(gl);
        this.maskManager.setContext(gl);
        this.filterManager.setContext(gl);
        this.blendModeManager.setContext(gl);
        this.stencilManager.setContext(gl);

        this.renderSession.gl = gl;
	}
});

game.addAttributes('Renderer', {
	transparent: false,
	antialias: true,
	preserveDrawingBuffer: false
});

game.createClass('WebGLSpriteBatch', {
	init: function() {
	},

	setContext: function(context) {

	}
});

game.createClass('WebGLMaskManager', {
	init: function() {
	},

	setContext: function(context) {

	}
});

game.createClass('WebGLFilterManager', {
	init: function() {
	},

	setContext: function(context) {

	}
});

game.createClass('WebGLStencilManager', {
	init: function() {
	},

	setContext: function(context) {

	}
});

});
