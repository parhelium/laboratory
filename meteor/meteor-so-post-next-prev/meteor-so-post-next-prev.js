Posts = new Meteor.Collection("posts");

Router.map(function(){
    this.route('posts',{
      where:'client',           
      path:'/',
      template:'posts',
      waitOn:function(){
        return Meteor.subscribe('posts');
      },
      data:function(){
        return {posts:Posts.find({},{sort:{createdAt:-1}})};
      }
    });
    
    this.route('postDetails',{
      where:'client',
      path:'/post/:_postId',
      template:'postDetails',
      waitOn:function(){
        return [
            Meteor.subscribe('postDetails', this.params._postId),
            Meteor.subscribe('postDetailsPrev', this.params._postId),
            Meteor.subscribe('postDetailsNext', this.params._postId)
        ]
      },
      data:function(){
        var post = Posts.findOne({_id:this.params._postId});
        if(post == null) return {};
        else
            return {
                post : Posts.findOne({_id:post._id}, {limit:1}),
                prev : Posts.findOne({createdAt:{$lt:post.createdAt}},{sort:{createdAt:-1}}),
                next : Posts.findOne({createdAt:{$gt:post.createdAt}},{sort:{createdAt:1}})
            }
        }
      }
    })
})

if (Meteor.isClient) {
    
}

if (Meteor.isServer) {
  Meteor.startup(function () {
      Posts.remove();
      if(Posts.find().count() == 0){
          var posts = [
              {title:"1 post", createdAt:moment("01-10-1995", "DD-MM-YYYY").toDate()},
              {title:"2 post", createdAt:moment("02-10-1995", "DD-MM-YYYY").toDate()},
              {title:"3 post", createdAt:moment("03-10-1995", "DD-MM-YYYY").toDate()},
              {title:"4 post", createdAt:moment("04-10-1995", "DD-MM-YYYY").toDate()},
              {title:"5 post", createdAt:moment("05-10-1995", "DD-MM-YYYY").toDate()},
              {title:"6 post", createdAt:moment("06-10-1995", "DD-MM-YYYY").toDate()},
              {title:"7 post", createdAt:moment("07-10-1995", "DD-MM-YYYY").toDate()},
              {title:"8 post", createdAt:moment("08-10-1995", "DD-MM-YYYY").toDate()},
              {title:"9 post", createdAt:moment("09-10-1995", "DD-MM-YYYY").toDate()}
          ]
          posts.forEach(function(post){
            Posts.insert(post)
          })
      };
     
  });
  Meteor.publish("posts",function(){
      var posts =  Posts.find({},{sort:{createdAt:-1}});
      console.log(posts.count());
      return posts;
  });
  Meteor.publish("postDetailsNext",function(postId){   
      var post = Posts.findOne({_id:postId});
      return Posts.find({createdAt:{$gt:post.createdAt}},{sort:{createdAt:1}, limit:1})
  });
  Meteor.publish("postDetailsPrev",function(postId){  
      var post = Posts.findOne({_id:postId});
      return  Posts.find({createdAt:{$lt:post.createdAt}},{sort:{createdAt:-1}, limit:1})
  });
  Meteor.publish("postDetails",function(postId){
      return Posts.find({_id:postId}, {limit:1})
  })
}
