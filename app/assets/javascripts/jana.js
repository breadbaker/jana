window.Jana = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {

		Jana.loginView = new Jana.Views.Login();
		Jana.mainView = new Jana.Views.Main();
		Jana.router = new Jana.Routers.Router();
  }
};

$(document).ready(function(){
  Jana.initialize();
});
