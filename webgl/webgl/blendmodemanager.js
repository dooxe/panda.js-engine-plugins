game.module(
	'plugins.webgl.blendmodemanager'
)
.body(function() {
	
game.createClass('WebGLBlendModeManager', {
	currentBlendMode: 99999,

	setContext: function(gl) {
	    this.gl = gl;
	},

	setBlendMode: function(blendMode) {
	    if(this.currentBlendMode === blendMode)return false;

	    this.currentBlendMode = blendMode;
	    
	    var blendModeWebGL = game.blendModesWebGL[this.currentBlendMode];
	    this.gl.blendFunc(blendModeWebGL[0], blendModeWebGL[1]);
	    
	    return true;
	},

	destroy: function() {
	    this.gl = null;
	}
});

});
