if (Meteor.isClient) {
    Template.create.events({
        'click .btn':function(e){
            e.preventDefault();
            console.log("create");
        }
    })

    Template.edit.events({
        'click .btn':function(e){
            e.preventDefault();
            console.log("edit");
        }
    })
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
