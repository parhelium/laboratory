Order = new Meteor.Collection("order", {
    schema: {
        'orderLayers': {
            type: Number,
            label: "Layers",
            optional: false,
            decimal: true,
            min: 0
        },
        'orderLength': {
            type: Number,
            label: "Length",
            optional: false,
            decimal: true,
            min: 0
        },
        'orderSum': {
            type: Number,
            optional: false,
            decimal: true,
            autoValue:function(){
                var result = this.siblingField("orderLength").value +this.siblingField("orderLayers").value;
                console.log(result);
                return result
            }
        }
    }
});

if (Meteor.isClient) {
  Template.form.greeting = function () {
//    return "Welcome to meteor-so-autoform-autovalue-fields.";
  };

  Template.form.events({
//    'click input': function () {
//      if (typeof console !== 'undefined')
//        console.log("You pressed the button");
//    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

