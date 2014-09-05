
Meteor.methods({
  'removeAll':function(){
    Requests.remove({});
  }//,
  // 'makeRequest':function(params){
  //   var user = Meteor.user();

  //   if(!user)
  //     throw new Meteor.Error(401, "You need to be logged in to make a request");

  //   request = _.extend(_.pick(params, 'start','end','order'), {
  //     requester: user,
  //     title: user.profile.name,
  //     packedBy: null,
  //     deliveredBy: null,
  //     color: 'red',
  //     sumbitted: new Date().getTime()
  //   });

  //   Requests.insert(request);
  // }
})
