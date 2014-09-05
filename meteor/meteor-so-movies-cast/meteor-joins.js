Movies = new Meteor.Collection("movies");
Casts = new Meteor.Collection("casts");

if (Meteor.isClient) {
    Meteor.startup(function(){


    })
    Template.movies.helpers({
        movies : function () {
            console.log("inside movies helper");
            return Movies.find();
        }

    });

    Template.movie.helpers({
        casts : function () {
            console.log("inside movie.helpers");
            console.log(this);
            return Casts.find({_id: {$in:this.cast_id}}) ;
        }
    });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
      if(Movies.find().count() === 0){
          Movies.insert({
              "_id" : "S7mGgtJhiQ3GZavqn",
              "cast_id" : [
                  "pBnAFGaxNGLkDGuPk",
                  "7HZkmd6BofNmjXRyw"
              ],
              "date" : "31-May-2014",
              "name" : "Rakshak",
              "vote" : 4
          })
      }
      if(Casts.find().count() === 0){
        Casts.insert({
            "_id" : "pBnAFGaxNGLkDGuPk",
            "link" : "http://en.wikipedia.org/wiki/Poonam_Dhillon",
            "name" : "Poonam Dhillon"
        });
        Casts.insert({
            "_id" : "7HZkmd6BofNmjXRyw",
            "link" : "http://en.wikipedia.org/wiki/Rishi_Kapoor",
            "name" : "Rishi Kapoor"
        })
      }
  });
}
