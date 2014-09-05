Settings = new Meteor.Collection("settings");
if (Meteor.isClient) {

    var settings = Injected.obj('settings');
    console.log(settings);
    Router.map(function () {
        this.route('postShow', {
            path: '/'+settings.path,

            action: function () {
                console.log("dynamic route !");
            }
        });
    });
}

if (Meteor.isServer){
    if(Settings.find().count() == 0){
        Settings.insert({path:"test",data:"null"});
    }

    Inject.obj('settings', Settings.findOne());
}
