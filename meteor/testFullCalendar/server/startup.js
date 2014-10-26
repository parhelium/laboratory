Meteor.startup(function() {
 
  if(Requests.find().fetch().length === 0) {
    // empty request database


    var start = new Date();
    console.log('Creating dummy requests: ');
 
    var requests = [
      {requester: "requester2", start: '2014/05/7' , end: '2014/05/7', packedBy:true, deliveredBy:true,color:'green'},
      {requester: "requester1", start: '2014/05/7' , end: '2014/05/7', packedBy:true, deliveredBy:false,color:'blue'},
      {requester: "requester3", start: '2014/05/04', end: '2014/05/04', packedBy:false, deliveredBy:false,color:'red'},
      {requester: "requester2", start: '2014/05/14', end: '2014/05/14', packedBy:true, deliveredBy:true, color:'green'}
    ]

    _.each(requests, function(req) {
      console.log(req);
      Requests.insert({requester: req.requester, title: req.requester, start: req.start, end: req.end, packedBy: req.packedBy, deliveredBy: req.deliveredBy,color: req.color});
    });
  } // if empty requests

}); //startup

