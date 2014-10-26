Meteor.publish('allReqs', function(){
	return Requests.find();
});


