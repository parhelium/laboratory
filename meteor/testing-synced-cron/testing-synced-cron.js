Posts = new Mongo.Collection('posts')

if (Meteor.isClient) {

}

if (Meteor.isServer) {

  var counter = 1;

  var job = function( intendedAt , cb ){
    console.log( "Starting the job #" , counter );
    Meteor.setTimeout( function () {
      // blocks SyncedCron from executing next job if cb wasn't called before
      cb && cb()
    },10000 )
    console.log( "Finishing the job #" , counter );
    counter++;

    // non blocking solution
    cb && cb();
  }

  var _job = Meteor.wrapAsync( job )

  // wrapAsync blocks SyncedCron execution
  // my understanding is that it runs in the same Fiber and it waits until cb is executed
  // it should run every 2 seconds, but runs every 10 seconds.
  SyncedCron.add({
    name: 'Meteor.wrapAsync - using the same Fiber - should run every 2 seconds',
    schedule: function(parser) {
      return parser.text('every 2 seconds');
    },
    job: Meteor.wrapAsync( job )
  });


  // non blocking

  //SyncedCron.add({
  //  name: 'Meteor.defer - using new Fiber',
  //  schedule: function(parser) {
  //    // parser is a later.parse object
  //    return parser.text('every 2 seconds');
  //  },
  //  job: function() {
  //    job()
  //  }
  //});

  SyncedCron.start();
}
