if (Meteor.isClient) {
    Template.herokuDashboard.helpers({
        appInfo: function() {
            return Session.get("herokuDashboard_appInfo");
        }
    });
    Template.herokuDashboard.created = function(){
        Meteor.call('getData', function (error, result) {
            Session.set("herokuDashboard_appInfo",result);
        } );
    }
}
/* Using Meteor._wrapAsync */
if (Meteor.isServer) {
  var asyncFunc = function(callback){
      setTimeout(function(){
          // callback(error, result);
          // success :
          callback(null,"result");
          // failure:
          // callback(new Error("error"));
      },2000)
  }
  var syncFunc = Meteor._wrapAsync(asyncFunc);
  Meteor.methods({
      'getData': function(){
          var result;
          try{
               result = syncFunc();
          }catch(e){
              console.log("getData method returned error : " + e);
          }finally{
              return result;
          }

      }
  });
}

/* Using Future library: */
if (Meteor.isServer) {
    Future = Npm.require('fibers/future');
    Meteor.startup(function () {
        Meteor.methods({
            'getData': function (){
                var fut = new Future();
                setTimeout(function(){
                    fut["return"]("test");
                },2000)
                return fut.wait();
            }
        });
    });
}
