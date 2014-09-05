if (Meteor.isClient) {
  Router.configure({
    layoutTemplate:'layout'
  });
  Router.map(function () {
    this.route('test', {
      path: '/test',
      template:'test',
      before:function(){
        Session.set("title","Title #1")
      }
    });
    this.route('test2', {
      path: '/test2',
      template:'test',
      before:function(){
        Session.set("title","Title #2")
      }
    });
  })
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
