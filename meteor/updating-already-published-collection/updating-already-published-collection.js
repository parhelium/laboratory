Posts = new Mongo.Collection("posts");

if (Meteor.isClient) {

    var allPostsHandle;
    Meteor.startup(function(){
        console.log("start");
        // initial selection
        Session.set("idxLessThan",6);

        Tracker.autorun(function(){
            console.log("autorun -> ");
            if(allPostsHandle) allPostsHandle.stop();
            allPostsHandle = Meteor.subscribe('allPosts',Session.get("idxLessThan"));
        })
    })

    Template.posts.items = function(){
        return Posts.find({});
    }
}

if (Meteor.isServer) {
  Meteor.startup(function () {
      if(Posts.find().count() == 0 ){
          Posts.insert({title:"Post1", idx:1})
          Posts.insert({title:"Post2", idx:2})
          Posts.insert({title:"Post3", idx:3})
          Posts.insert({title:"Post4", idx:4})
          Posts.insert({title:"Post5", idx:5})
      }
  });
    Meteor.publish("allPosts", function(idx){
        console.log("allPosts = " ,idx, Posts.find({idx:{$lt:idx}}).count())
        idx = idx || 100;
        return Posts.find({idx:{$lt:idx}});
    })
}
