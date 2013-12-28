window.Jana = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {



		Jana.loginView = new Jana.Views.Login();
		Jana.allPieces = new Jana.Collections.Pieces();
    Jana.mainView = new Jana.Views.Main();


		Jana.allPieces.url = '/pieces';
		Jana.allPieces.fetch({
			success: function(){
				Jana.mainView.allPieces();
			}
		});

		Jana.router = new Jana.Routers.Router();
  }
};

$(document).ready(function(){
  Jana.initialize();
});
