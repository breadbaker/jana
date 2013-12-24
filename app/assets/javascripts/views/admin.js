Jana.Views.Admin = Backbone.View.extend({

	initialize: function(){
		Jana.editPieceView = new Jana.Views.editPieceView();
		Jana.statsView = new Jana.Views.statsView();
	},

	addHandlers: function(){
		var that = this;
		$('body').delegate('.adminButton').on('click',function(){
			var item = $(this);
			var action = item.attr('data-action');
			
			that[action].apply(this, item);
		});
	},

	editPieces: function(){
		this.renderPieces(Jana.allPieces.models, 'edit');
	},

	editPiece: function(item){
		Jana.editPiece = Jana.allPieces.get(item.attr('data-id'));
		Jana.editPieceView.render();
		this.modal($('newpiecemodal'));
	},

	newPiece: function(){
		Jana.editPiece = new Jana.Models.Piece();
		Jana.editPieceView.render();
		this.modal($('newpiecemodal'));
	},

	stats: function(){
		Jana.statsView.rende();
		this.modal($('statsmodal'));
	}
});
