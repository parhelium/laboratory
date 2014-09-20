if (Meteor.isClient) {
   UI.registerHelper('loadMessage',function(p1){
       return p1 + " modified";
   })

  Template.test.helpers({
    translated_slug: function () {
      var data = Template.currentData();
      var slug = data.slug || "default slug";
      return UI._globalHelpers.loadMessage(slug)
    }
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
