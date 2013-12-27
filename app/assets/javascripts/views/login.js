Jana.Views.Login = Backbone.View.extend({
	initialize: function(){
		$('loginmodal').html(JST['login/login']());
		this.addHandlers();
		this.render();
		this.checkLogin();
	},

	el: 'username',

	checkLogin: function(){
		var that = this;
		$.ajax({
			url: '/sessions',
			type: 'POST',
			success: function(resp){
				Jana.user = new Jana.Models.User(resp.user);
				that.render();
				if( Jana.user.get('admin')){
					if (!Jana.adminView){
						Jana.adminView = new Jana.Views.AdminView();
					}
				}
			}
		});
	},

	addHandlers: function(){
		var that = this;
		this.$el.delegate('button.login','click',function(){
			that.modal($('loginmodal'));
		});
		$('loginmodal').delegate('form','submit',function(e){
			e.preventDefault();
			var form = $(this);
			var data = form.serializeJSON();
			var url = form.attr('action');
			$.ajax({
				url: url,
				type: "POST",
				data: data,
				success: function(resp){
					that.modal($('loginmodal'));
          if ( resp.message ) {
            that.messageSuccess(resp.message, 2000);
          } else {
  					Jana.user = new Jana.Models.User(resp.user);

  					that.render();

  					if( Jana.user.get('admin')){
  						if (!Jana.adminView){
  							Jana.adminView = new Jana.Views.AdminView();
  						}
  					}
          }
			  },
				error: function(resp){
					console.log(resp);
          that.messageFail(resp.responseJSON.message, 3000);
				}
			});
		});
		$('loginmodal').delegate('a.changeLoginType', 'click', function(e){
			e.preventDefault();
			var template = $(this).attr('data-template');
			$('loginmodal').html(JST['login/'+template]());
		});
		this.$el.delegate('button.logout','click', function(){
			$(this).addClass('hide');
			$.ajax({
				type: 'DELETE',
				url: '/sessions',
				success: function(){
					Jana.user = null;
					that.render();
				}
			});
		});
	},

	render: function(){
		if( Jana.user){
			this.$el.html(JST['login/user']());
		} else {
			this.$el.html(JST['login/nonuser']());
		}
	}

});
