Posts = new Meteor.Collection("posts");
if (Meteor.isClient) {
}

if (Meteor.isServer) {
  Meteor.startup(function () {
        if(Posts.find().count() == 0){

            Posts.insert()
        }
  });
}
