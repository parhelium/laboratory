// This experiment prooves that whenever data in Template.child is changed
// then autorun executes callback
if (Meteor.isClient) {

    Session.setDefault("childContent", 1);

    Template.test.childContent = function () {
         return Session.get("childContent");
    }

    Template.child.rendered = function () {
        this.autorun(function(){
            console.log("Template.child.rendered -> autorun ",Template.currentData());
        })
    }
}
