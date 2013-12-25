Jana.Views.editPieceView = Backbone.View.extend({
	
	el: 'editpiecemodal',

	initialize: function(){
		
		this.addHandlers();
	},

	addHandlers: function(){
		var that = this;
		this.$el.delegate('.pieceAction','click', function(){
			var item = $(this);
			var action = item.attr('data-action');
			that[action].apply(that, item);
		});
		this.$el.delegate('input.newSrc', 'change', function(){
			that.newPhotoSrc(this);
		});
	},
	
	exit: function(){
		this.modal($('editpiecemodal'));
		this.renderPieces(Jana.allPieces,
	},

	newPhoto: function(){
		this.$el.find('input.newSrc').click();
	},

	createPiece: function(){
		var that = this;
		var data = this.$el.find('form').serializeJSON();
		data['image'] = $('photoPreview').attr('src');
		Jana.editPiece.set(data);
		Jana.editPiece.save( { 
			success: function(resp) {
				that.messageSuccess('Piece Created', 1000);
				that.allPieces.add(resp.piece);
				that.exit();
			},
			error: function(resp) {
				console.log(resp);
				that.messageFail('Fail', 1000);
			}
		});
	},

	savePiece: function(){
		var that = this;
		var data = this.$el.find('form').serializeJSON();
		data['image'] = $('photoPreview').attr('src');
		Jana.editPiece.set(data);
		Jana.editPiece.save( { 
			success: function(resp) {
				that.messageSuccess('Piece Saved', 1000);
				that.exit();
			},
			error: function(resp) {
				console.log(resp);
				that.messageFail('Fail', 1000);
			}
		});
	},

	deletePiece: function(){
	},

	render: function(){
		this.$el.html(JST['form/edit']());
	},

	newPhotoSrc: function(input) {
    var that = this;
    if (input.files && input.files[0]) {
      var reader = new FileReader();
 
      reader.onload = function (e) {	
 				$('photoPreview').attr('src', e.target.result);
 				that.unHide($('photoPreview'),300);
 			};
 
      reader.readAsDataURL(input.files[0]);
    }
  }
});
