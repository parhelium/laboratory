Projects = new Meteor.Collection("projects");
Stories = new Meteor.Collection("stories");

if (Meteor.isClient) {

  Router.configure({
    layoutTemplate: 'layout'
  });

  Router.map(function () {
    this.route('projectShow', {
      path: '/projects/:_id',
      waitOn: function () {
        console.log("id = %s",this.params._id)
        Session.set('projectId', this.params._id)
        return Meteor.subscribe('projectAndStories', this.params._id)
      }
    });
  });

  Template.projectShow.helpers({
    project : function(){
      return Projects.findOne({_id: Session.get('projectId')});
    },
    stories : function(){
      return Stories.find({projectId: Session.get('projectId')})
    } 
  })
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    console.log("startup");
    console.log("Projects.find().count() = ",Projects.find().count());
    if (Projects.find().count() === 0) {
      for(var i =0; i < 5; i++){
        var p = Projects.insert({
          name: "Project #"+i,
        });
        console.dir(p);
        for (var j = 0 ; j < 3 ; j++){
          Stories.insert({
            title: "Story #"+j,
            projectId:p
          });  
        }
      }
    }else{
      var ps = Projects.find().fetch();
      for(var k = 0; k < ps.length; k++){
        console.log(ps[k]._id);
      }
    }
    Meteor.publish("projectAndStories", function(id) {
      return [
        Stories.find({projectId: id}),
        Projects.find({_id: id})
      ]
    })
  });
}

