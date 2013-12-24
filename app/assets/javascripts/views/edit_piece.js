Jana.Views.editPieceView = Backbone.View.extend({
	
	el: 'editpiecemodal',

	initialize: function(){
		
		this.addHandlers();
	},

	addHandlers: function(){
		var that
		this.$el.delegate('.pieceAction', function(){
			var item = $(this);
			var action = item.attr('data-action');
			that[action].apply(that, item);
		});
	},

	createPiece: function(){
	},

	savePiece: function(){
	},

	deletePiece: function(){
	},

	render: function(){
		this.$el.html(JST['form/edit']());
	}
});
