if (Meteor.isClient) {

}

if (Meteor.isServer) {
  var asyncCallback = function( a, cb ){
    var error = null;
    cb(error, a, 'string b')
  };

  var syncCallback = Meteor.wrapAsync( asyncCallback )

  console.log( syncCallback( 2 ) );
}
