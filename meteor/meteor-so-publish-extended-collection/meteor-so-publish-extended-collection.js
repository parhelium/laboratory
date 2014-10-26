
if (Meteor.isClient) {
// client: declare collection to hold count object
    postWithComments = new Meteor.Collection("postWithComments");
}

if (Meteor.isServer) {
  Meteor.startup(function () {
      Meteor.publish("postWithComments", function(threadId){
          var self = this;
          var initializing = true;

          var handle = forumReplies.find({thread: threadId}).observeChanges({
              added: function (id) {
                  self.changed("postWithComments", threadId, {count: count});
              },
              removed: function (id) {
                  self.changed("postWithComments", threadId, {count: count});
              }
              // don't care about changed
          });

          self.added("postWithComments", roomId, {count: count});
          self.ready();
          self.onStop(function () {
              handle.stop();
          });
      });
  });
}
