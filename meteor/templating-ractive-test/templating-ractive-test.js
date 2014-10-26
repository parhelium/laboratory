if (Meteor.isClient) {
    Template.test.rendered = function(){
        new Ractive({
            el: "#container",
            template: Ract.RactiveTemplate1,
            data: { greeting: 'Hello', name: 'world' }
        });

        new Ractive({
            el: "#container",
            append : "true",
            template: Ract['ractive-template'],
            data: { greeting: 'Hello', name: 'world' }
        });

    }
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
