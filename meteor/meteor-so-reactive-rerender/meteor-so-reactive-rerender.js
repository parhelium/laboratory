if (Meteor.isClient) {
  Template.List.helpers({
      items : function () {
          return [1,2,3,4,5,6]
      },
      selectedItem:function(){
          var item = Session.get("selected");
          return item;
      }
  })

  Template.List.rendered = function(){
      var self = this;
      this.deps = Deps.autorun(function(){
          var data = Session.get("selected");
      })
  };
  Template.List.destroyed = function(){
      this.deps.stop();
  };
}