if (Meteor.isClient) {
   Template.hello.helpers(
      {
         greeting: function () {
            console.log("retunring greeting text")
            return "Welcome to app.";
         },

         name: function() {
            return Session.get("name");
         }
      })

   Template.hello.events(
      {
         'change #name': function () {
            console.log("changing the name");
            Session.set("name", $("#name").val());
         },

         'click input': function () {
            // template data, if any, is available in 'this'
            if (typeof console !== 'undefined')
               console.log("You pressed the button");
         }
      });
}

if (Meteor.isServer) {
   Meteor.startup(function () {
      // code to run on server at startup
   });
}
