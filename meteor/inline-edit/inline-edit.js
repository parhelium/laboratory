if (Meteor.isClient) {
  var clientIsEditing = new ReactiveVar(false);

  Template.admin.events({
      'click #addClient': function(event) {
          clientIsEditing.set(true);
      }
  });

  Template.clientView.clientEditMode = function() {
      return clientIsEditing.get();
  }
  Template.clientView.name = function() {
      return "name";
  }
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
