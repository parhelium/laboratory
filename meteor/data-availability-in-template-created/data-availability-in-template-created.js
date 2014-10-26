Posts = new Meteor.Collection("posts");

Router.configure({
    loadingTemplate: 'Loading',
    notFoundTemplate: 'NotFound'
});

if (Meteor.isClient) {

  // Activate loading hook
  // Try to comment/uncomment below line and open Console to see the difference
  Router.onBeforeAction('loading');

  Router.map(function(){
      this.route("test",{
          path:"/",
          waitOn:function(){
              return Meteor.subscribe("posts");
          },
          data:function(){
              var posts = Posts.find();
              console.log("data function -> posts.count ", posts.count());
              return {
                  posts:posts,
                  static:"hello world"
              };
          },

          onData: function() {
            console.log("onData", arguments);
          }
      })
  })
    Template.test.created = function(){
       console.log("Template.test.created ", this.data , this.data.posts.count());
    }
    Template.test.rendered = function(){
        var self = this;
        console.log("Template.test.rendered", self.data, self.data.posts.count());
    }
}

if (Meteor.isServer) {
  Meteor.publish("posts", function(){
      var Future = Npm.require('fibers/future');
      console.log("Meteor.publish(posts)")
      var future = new Future;
      Meteor.setTimeout(function(){
          var cursor;
          cursor = Posts.find({});
          console.log("Delayed by 10 sec - > ", cursor.count());
          future.return(cursor);
      }, 2000);
      return future.wait();
  })
  Meteor.startup(function () {
      if(Posts.find().count() == 0){
          Posts.insert({"title":"test1"});
          Posts.insert({"title":"test2"});
          Posts.insert({"title":"test3"});
          Posts.insert({"title":"test4"});
      }
  });
}
