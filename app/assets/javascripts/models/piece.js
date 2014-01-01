Jana.Models.Piece = Backbone.Model.extend({
  urlRoot: '/pieces',
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  finished: function() {
    var date = this.get('date_finished').split('-');
    var month = this.months[parseInt(date[1])];
    if( month === undefined){
      return '';
    }
    return month+ ' ' + date[0];
  }
});
