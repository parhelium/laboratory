Requests = new Meteor.Collection('reqEvents');


Requests.allow({
  'update': function(userId) {
    return true;
  },
  'insert': function(userId) {
    return true;
  }
}); 

