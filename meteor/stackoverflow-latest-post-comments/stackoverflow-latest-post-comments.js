Posts = new Meteor.Collection('posts');
Comments = new Meteor.Collection('comments');

if (Meteor.isClient) {

  Router.configure({
    layoutTemplate: 'layout'
  });

  Router.map(function () {

   this.route('home', {
    path: '/',
    template: 'home',
    waitOn: function () {
      return [
        Meteor.subscribe('latestPost')
      ];
    },
    data:function(){
      return {
       post:Posts.findOne(),
       comments:Comments.find()
      };
    },
   });
   this.route('home2', {
    path: '/0',
    template: 'home',
    data:function(){
      return {
       post:Posts.findOne(),
       comments:Comments.find()
     }
   },
 });

 });
}

if (Meteor.isServer) {


  Meteor.startup(function () {
    if (Posts.find().count() === 0) {

      var post2 = Posts.insert({
        title: "title2",
        created: (new Date("2011","08","28").getTime()),
      });
      var post1 = Posts.insert({
        title: "title1",
        created: (new Date().getTime()),
      });

      Comments.insert({postId:post1, content:'Comment 1: Post 1 '});
      Comments.insert({postId:post2, content:'Comment 1: Post 2'});
      Comments.insert({postId:post1, content:'Comment 2: Post 1'});
      Comments.insert({postId:post1, content:'Comment 3: Post 1 '});
    }
    // code to run on server at startup
    Meteor.publish("latestPost", function () {
      var post = Posts.find({}, {sort:{created:-1}}).fetch()[0];
      console.log("publish : " + post.title);
      return [
      Posts.find({_id: post._id}),
      Comments.find({postId: post._id})
      ];
    });
  });
}
