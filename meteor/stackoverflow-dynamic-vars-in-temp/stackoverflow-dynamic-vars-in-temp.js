if (Meteor.isClient) {
  Template.user.get_users = function () {
    return [{
      _id: 'foo',
      books: [
        {name: 'book1'},
        {name: 'book2'}
      ]
    }]
  };

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
