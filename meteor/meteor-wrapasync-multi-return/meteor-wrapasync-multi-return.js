if (Meteor.isServer) {
  console.log('STARTED')
  var oneAsync = function( a, b, c, d, cb ){
    Meteor.setTimeout(function(){
      var error = null;
      cb(error, {a : a, b : b, c:c, d:d })
    }, 2000)
  };
  var twoAsync = function( a, b, c, d, cb ){
    Meteor.setTimeout(function(){
      var error = null;
      cb(error, {a : a, b : b, c:c, d:d })
    }, 2000)
  };
  var threeAsync = function( a, b, c, d, cb ){
    Meteor.setTimeout(function(){
      var error = null;
      cb(error, {a : a, b : b, c:c, d:d })
    }, 2000)
  };

  var one = Meteor.wrapAsync( oneAsync )
  var two = Meteor.wrapAsync( twoAsync )
  var three = Meteor.wrapAsync( threeAsync )

  var resultOne = one( 1,2,3,4 )
  console.log('FINISHED ONE', resultOne)
  var resultTwo = two( 1,2,3,4 )
  console.log('FINISHED TWO', resultTwo)
  var resultThree = three( 1,2,3,4 )
  console.log('FINISHED THREE', resultThree)

  console.log('FINISHED')
}
