Books = new Meteor.Collection("books");
if (Meteor.isClient) {
  Template.home.events({
    'click .showBookModal': function(e) {
      Session.set("bookModalID", e.target.id);
      $('#bookModal').modal('show');
    }
  });
  Template.bookModal.book = function() {
    return Books.find({_id: Session.get('bookModalID')});
  }
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    if(Books.find().count() === 0){
      for(var i = 0; i < 10; i++){
        Books.insert({
          title:"title"+i,
        })
      }
    }
  });
}
