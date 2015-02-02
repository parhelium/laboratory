Persons   = new Mongo.Collection("persons");
Sources   = new Mongo.Collection("source");
Families  = new Mongo.Collection("families");

Counts = new Meteor.Collection("counts");



if (Meteor.isClient) {
    Deps.autorun(function () {
        console.log('inside autorun');
        Meteor.subscribe("counts-all");
        console.log(Counts.find({_id:"persons"}).fetch());
        var persons     = Counts.findOne({_id:"persons"}) || {};
        var sources     = Counts.findOne({_id:"sources"}) || {} ;
        var families    = Counts.findOne({_id:"families"}) || {};
        console.log(persons.count, sources.count, families.count);
    });
}

if (Meteor.isServer) {
    var generateDataFor = function(collection, amount){
        if(collection.find().count() == 0){
            for(var i = 0; i < amount ; i++){
                collection.insert({number:i});
            }
        }
    }
    Meteor.startup(function(){
        generateDataFor(Persons,20);
        generateDataFor(Families,20);
        generateDataFor(Sources,20);
    })

    Meteor.publish("counts-all", function () {
        var self = this;

        var pcount = 0;
        var fcount = 0;
        var scount = 0;
        var initializing = true;

        var phandle = Persons.find({}).observeChanges({
            added: function (id) {
                pcount++;
                if (!initializing)
                    self.changed('counts', 'persons', {count: pcount});
                // self.changed('counts', 0, {count: pcount});
            },
            removed: function (id) {
                pcount--;
                self.changed('counts', 'persons', {count: pcount});
                // self.changed('counts', 0, {count: pcount});
            }
            // don't care about changed
        });

        var fhandle = Families.find({}).observeChanges({
            added: function (id) {
                fcount++;
                if (!initializing)
                    self.changed('counts', 'families', {count: fcount});
                // self.changed('counts', 1, {count: fcount});
            },
            removed: function (id) {
                fcount--;
                self.changed('counts', 'families', {count: fcount});
                // self.changed('counts', 1, {count: fcount});
            }
            // don't care about changed
        });

        var shandle = Sources.find({}).observeChanges({
            added: function (id) {
                scount++;
                if (!initializing)
                    self.changed('counts', 'sources', {count: scount});
                // self.changed('counts', 2, {count: scount});
            },
            removed: function (id) {
                scount--;
                self.changed('counts', 'sources', {count: scount});
                // self.changed('counts', 2, {count: scount});
            }
            // don't care about changed
        });

        // Instead, we'll send one `self.added()` message right after
        // observeChanges has returned, and mark the subscription as
        // ready.
        console.log('publish counts: ' + pcount + ' ' + fcount + ' ' + scount);
        initializing = false;

        self.added('counts', 'persons', {count: pcount});
        self.added('counts', 'families', {count: fcount});
        self.added('counts', 'sources', {count: scount});


        self.ready();

        // Stop observing the cursor when client unsubs.
        // Stopping a subscription automatically takes
        // care of sending the client any removed messages.
        self.onStop(function () {
            phandle.stop();
            fhandle.stop();
            shandle.stop();
        });
    });
}
