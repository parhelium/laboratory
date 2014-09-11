Posts = new Mongo.Collection(
            "posts",
            {
                transform:function(post){
                    console.log("transform : ",post);
                    post.oki = "test"
                    post.titleToUpperCase = function(){
                        return post && post.title && post.title.toUpperCase();
                    }
                    return post;
                }
            }
        )

if (Meteor.isClient) {
    Meteor.startup(function(){
        Deps.autorun(function(){
            var post = Posts.findOne();
            console.log("post.titleToUpperCase() = ", post && post.titleToUpperCase());
        })
    })
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    if(Posts.find({}).count() ==0){
        Posts.insert({
            title:"hello world"
        })
        Posts.insert({
            title:"Oki doki"
        })
    }
  });
  var post = Posts.findOne();
  console.log("post.titleToUpperCase() = ",post && post.titleToUpperCase && post.titleToUpperCase());
}
