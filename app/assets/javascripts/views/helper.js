_.extend(Backbone.View.prototype, {
	
	overlay: $('overlay'),

	messenger: $('messenger'),

	failMessenger: $('failmessenger'),

	successMessenger: $('successmessenger'),
	
  modal: function(el) {
		if(el.hasClass('modal_active'))
		{
			el.removeClass('modal_active');
			this.hide(this.overlay, 200);
			this.hide(el, 200);
		} else {
			el.addClass('modal_active');
			this.unHide(this.overlay, 200);
			this.unHide(el, 200);
		}
	},

	hide: function(el, time) {
    el.addClass('hidden');
    setTimeout(
      function(){
        el.addClass('hide');
      }
      , time);
  },
  unHide: function(el, time) {
    el.removeClass('hide');
    setTimeout(
      function(){
        el.removeClass('hidden');
      }
      , time);
  },

  empty: function(el,time){
    setTimeout(function(){
      el.html('')
    }, time);
  },

  hideShow: function(el1, el2, time){
    this.hide(el1,time);
    var that = this;
    setTimeout(
      function(){
        that.unhide(el2,time);
      }
      , time);
  },

  messageSuccess: function(m, time) {
		var s = this.successMessenger;
    s.html(m);
    var that = this;
    this.unhide(s,200);
    setTimeout(
      function(){
        that.hide(s,200);
      }, time);
  },
  messageFail: function(m,time) {
		var f = this.failMessenger;
    f.html(m);
    var that = this;
    this.unhide(f,200);
    setTimeout(
      function(){
        that.hide(f,200);
      }, time);
  },
  messageNotify: function(m,time) {
		var mes = this.messenger;
    mes.html(m);
    var that = this;
    this.unhide(mes,200);
    setTimeout(
      function(){
        that.hide(mes,200);
      }, time);
  },

	renderPieces: function(pieces, template){
		var renderedPiece;
		Jana.piecesHolder.html('');
    _.each(pieces, function(piece){
      renderedPiece = JST['piece/'+ template]({
				piece: piece
      });
      Jana.piecesHolder.append(renderedPiece);
    });
	}

});
