Jana.Views.Main = Backbone.View.extend({
	initialize: function(){
		this.mainHolder = $('mainholder');
		this.render();
    Jana.piecesHolder = $('piecesholder');

		this.addHandlers();
	},

	addHandlers: function() {

	},

	allPieces: function() {
    this.renderPieces(Jana.allPieces.models, 'thumb');
  },

	newPieces: function() {
	},

	render: function(){

	}
});
