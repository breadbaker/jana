Jana.Views.Login = Backbone.View.extend({
	initialize: function(){
		$('loginmodal').html(JST['login/login']());
		this.addHandlers();
		this.render();
	},

	el: 'username',

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
				data: data,
				success: function(resp){
					Jana.user = new Jana.Models.User(resp.user);
					that.modal($('loginmodal'));

					that.render();

					if( Jana.user.get('admin')){
						if (!Jana.adminView){
							Jana.adminView = new Jana.Views.AdminView();
						}

					}
			  },
				error: function(resp){
					console.log(resp);
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
				type: 'POST',
				url: '/sessions/destroy',
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
