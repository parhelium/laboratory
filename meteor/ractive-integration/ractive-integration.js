if (Meteor.isClient) {
    Template.helloWorld.helpers({});

    Template.helloWorld.rendered = function () {

        if(!Ractive) {
            console.error("Ractive library is not included");
            return;
        }else{
            console.log("Ractive is installed " ,Ractive);
        }

        var template = this.$("ract").contents().filter(function() {
                return this.nodeType === 8;
            }).get(0).nodeValue;

        var ractive = new Ractive({
            el: ".container",
            template: template,
            data: { greeting: 'Hello', name: 'World' }
        });

    }
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });
}
