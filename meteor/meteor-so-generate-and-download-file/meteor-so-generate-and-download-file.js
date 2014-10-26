if (Meteor.isClient) {
  Template.view.events({
    'click button': function () {
      // generate file on server side
      Meteor.call('generateFile', function (error, result) {
          if(error){
              console.error("generateFile error: " ,error);
              return;
          }
          if(result && result.url){
              console.log("File was generated. Trying to download.")
              window.open(result.url);
          }else{
              console.error("Incorrect data returned from 'generateFile' method");
          }
      });
    }
  });
}

if (Meteor.isServer) {
    Future = Npm.require('fibers/future');
    Meteor.startup(function () {
        Meteor.methods({
            'generateFile': function (){
                var fut = new Future();
                // async file generation simulated by setTimeout
                setTimeout(function(){
                    fut["return"]({url:"http://google.com"});
                },2000)
                return fut.wait();
            }
        });
    });
}

