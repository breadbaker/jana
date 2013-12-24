Jana.Views.Login = Backbone.View.extend({
	initialize: function(){
		this.addHandlers();	
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
					that.$el.html(JST['login/user']());
			  },
				error: function(resp){
					console.log(resp);
				}
			});
		});
		this.$el.delegate('a.changeLoginType', 'click', function(e){
			e.preventDefault();
			var template = $(this).attr('data-template');
			that.$el.html(JST['login/'+template]());
		});
		this.$el.delegate('button.logout','click', function(){
			that.logoutButton.addClass('hide');
			$.ajax({
				type: 'POST',
				url: '/sessions/destroy',
				success: function(){
					that.loginButton.removeClass('hide');
				}
			});
		});
	},

	modal: function(el){
		if(el.hasClass('hide')){
			
		}
	},

	modalHide: function(){
	},

	render: function(){
		this.$el.html(JST[	
	}
	
});
