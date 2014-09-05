Template.home.events ({
	'click #learnButton': function(e) {
		e.preventDefault();
		Session.set('showLearnMore',true);
	}
	
});

