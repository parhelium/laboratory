Router.map(function(){
  this.route('home', {
    path: '/',
  	template: 'packLayout',
    data:function(){
      return Requests.find();
    },
   	waitOn: function() {
  		return Meteor.subscribe('allReqs');
  	}
  });
});
Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: 'notFound',
    loadingTemplate: 'loading'
});

