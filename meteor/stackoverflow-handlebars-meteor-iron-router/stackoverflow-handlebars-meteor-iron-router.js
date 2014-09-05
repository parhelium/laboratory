if (Meteor.isClient) {
  Router.configure({
  });
  Router.map(function () {
    this.route('test', {
      path: '/',
      data: {
          list_items:[{
            user: {
              username: "jdoe"
            },
            images: {
              low_res_url: "http://example.com"
            },
            linka: "http://example.com/profile"
          }]
      }  
    });
  })
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
