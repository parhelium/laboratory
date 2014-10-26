if (Meteor.isClient) {
    Template.helloWorld.helpers({});

    Template.helloWorld.rendered = function () {

        var ractive = new Ractive({
            el: ".container",
            template: Ract.getTemplate('ractive-integration'),
            data: { greeting: 'Hello', name: 'World' }
        });

    }
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });
}
