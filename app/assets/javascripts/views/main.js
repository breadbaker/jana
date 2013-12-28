Jana.Views.Main = Backbone.View.extend({
	initialize: function(){
    if ($('#message').length > 0) {
      this.messageNotify($('#message').html(), 2000);
    }
    this.mainHolder = $('mainholder');
		this.render();
    Jana.piecesHolder = $('piecesholder');
    this.pieceModal = $('piecemodal');
		this.addHandlers();
	},

	addHandlers: function() {
    var that = this;
    Jana.piecesHolder.delegate('.viewPiece', 'click', function(){
      that.viewPiece( $(this).attr('data-id'));
    });
	},

  viewPiece: function(id) {
    this.pieceModal.html(JST['piece/view']({
      piece: Jana.allPieces.get(id),
    }));
    this.modal(this.pieceModal);
  },

	allPieces: function() {
    this.renderPieces(Jana.allPieces.models, 'thumb');
  },

	newPieces: function() {
	},

	render: function(){

	}
});
