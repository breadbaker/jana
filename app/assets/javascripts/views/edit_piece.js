Jana.Views.editPieceView = Backbone.View.extend({

	el: 'editpiecemodal',

	initialize: function(){

		this.addHandlers();
	},

	addHandlers: function(){
		var that = this;
		this.$el.delegate('.pieceAction','click', function(e){
      e.preventDefault();
			var item = $(this);
			var action = item.attr('data-action');
      that.unHide($('overlayFull'), 200);
			that[action].apply(that, item);
		});
		this.$el.delegate('input.newSrc', 'change', function(){
			that.newPhotoSrc(this);
		});
	},

	exit: function(){
		this.modal($('editpiecemodal'));
		this.hide($('overlayFull'), 200);
    this.renderPieces(Jana.allPieces.models,'thumb');
	},

	newPhoto: function(){
		this.$el.find('input.newSrc').click();
    this.hide($('overlayFull'), 200);
	},

	createPiece: function(){

    this.messageNotify('Saving', 2000);
		var that = this;
		var data = this.$el.find('form').serializeJSON();
		data.piece['image'] = $('.photoPreview').attr('src');
		Jana.editPiece.save(data, {
			success: function(resp) {
				that.messageSuccess('Piece Created', 1000);
				Jana.allPieces.add(Jana.editPiece);
				that.exit();
			},
			error: function(resp) {
				console.log(resp);
				that.messageFail('Fail', 1000);
        that.hide($('overlayFull'), 200);
			}
		});
	},

	updatePiece: function(){
    this.messageNotify('Saving', 2000);
		var that = this;
		var data = this.$el.find('form').serializeJSON();
		data.piece['image'] = $('.photoPreview').attr('src');

		Jana.editPiece.save(data,{
			success: function(resp) {
				that.messageSuccess('Piece Saved', 1000);
				that.exit();
			},
			error: function(resp) {
				console.log(resp);
				that.messageFail('Fail', 1000);
        that.hide($('overlayFull'), 200);
			}
		});
	},

	deletePiece: function(){
    var that = this;
    Jana.editPiece.destroy({
			success: function(resp) {
				that.messageSuccess('Piece Deleted', 1000);
				that.exit();
			},
      error: function(resp){
        console.log(resp);
        that.hide($('overlayFull'), 200);
      }
    })
	},

	render: function(){
		this.$el.html(JST['form/edit']());
	},

	newPhotoSrc: function(input) {
    var that = this;
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
 				$('.photoPreview').attr('src', e.target.result);
        that.hide($('overlayFull'), 200);

 			};

      reader.readAsDataURL(input.files[0]);
    }
  }
});
