if (Meteor.isClient) {
  Template.tParent.helpers({
    helper1: function () {
      return "helper1"
    },
    helper2: function () {
      return "helper2"
    }
  });
    Template.tParent.events({
        'click div':function(){
            console.log(this)
        }
    })
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
