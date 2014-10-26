//Schema
Documents = new Meteor.Collection("documents", {
  schema: {
    requiredString: {
      type: String
    },
    optionalString: {
      type: String,
      optional: true
    },
    labelString: {
      type: String,
      label: "This is a custom label",
      optional: true
    },
    longString: {
      type: String,
      optional: true,
      max: 1000
    },
    maxString: {
      type: String,
      optional: true,
      max: 10
    },
    minString: {
      type: String,
      optional: true,
      min: 10
    },
    optionalStringArray: {
      type: [String],
      optional: true,
      minCount: 2,
      maxCount: 4
    },
    requiredBoolean: {
      type: Boolean,
      defaultValue: true
    },
    optionalBoolean: {
      type: Boolean,
      optional: true
    },
    radioBoolean: {
      type: Boolean,
      optional: true,
      defaultValue: true
    },
    selectBoolean: {
      type: Boolean,
      optional: true,
      defaultValue: false
    },
    requiredSelect: {
      type: Number,
      allowedValues: [1, 2, 3],
      defaultValue: 2
    },
    optionalSelect: {
      type: String,
      allowedValues: ["one", "two", "three"],
      optional: true
    },
    firstOptionSelect: {
      type: Number,
      allowedValues: [1, 2, 3],
      optional: true
    },
    firstOptionRequiredSelect: {
      type: Number,
      custom: function() {
        if (!_.contains([1, 2, 3], this.value)) {
          return "valueNotAllowed";
        }
      }
    },
    maxSelect: {
      type: [Number],
      allowedValues: [1, 2, 3],
      optional: true,
      maxCount: 2
    },
    minSelect: {
      type: [Number],
      allowedValues: [1, 2, 3],
      optional: true,
      minCount: 2
    },
    requiredNumber: {
      type: Number
    },
    optionalNumber: {
      type: Number,
      optional: true
    },
    maxNumber: {
      type: Number,
      optional: true,
      max: 10
    },
    minNumber: {
      type: Number,
      optional: true,
      min: 10
    },
    decimal: {
      type: Number,
      optional: true,
      decimal: true
    },
    requiredDate: {
      type: Date
    },
    optionalDate: {
      type: Date,
      optional: true
    },
    minDate: {
      type: Date,
      optional: true,
      min: (new Date(Date.UTC(2013, 0, 1)))
    },
    maxDate: {
      type: Date,
      optional: true,
      max: (new Date(Date.UTC(2012, 11, 31)))
    },
    requiredEmail: {
      type: String,
      regEx: SimpleSchema.RegEx.Email
    },
    optionalEmail: {
      type: String,
      regEx: SimpleSchema.RegEx.Email,
      optional: true
    },
    requiredUrl: {
      type: String,
      regEx: SimpleSchema.RegEx.Url
    },
    optionalUrl: {
      type: String,
      regEx: SimpleSchema.RegEx.Url,
      optional: true
    },
    'a.b.c': {
      type: String,
      label: "Subdocument field value",
      optional: true
    },
    items: {
      type: Array,
      optional: true
    },
    'items.$': {
      type: Object,
      label: "Item"
    },
    'items.$.name': {
      type: String
    },
    'items.$.quantity': {
      type: Number
    }
  }
});

Documents.simpleSchema().messages({
  noD: "No Ds allowed!!!",
  'regEx requiredEmail': "[label] is not a valid e-mail address",
  'regEx optionalEmail': "[label] is not a valid e-mail address",
  'regEx requiredUrl': "[label] is not a valid URL",
  'regEx optionalUrl': "[label] is not a valid URL"
});

Persons = new Meteor.Collection("persons", {
  schema: {
    _id: {
      type: String,
      optional: true
    },
    firstName: {
      type: String,
      label: "First name",
      max: 30
    },
    lastName: {
      type: String,
      label: "Last name",
      max: 30,
      unique: true
    },
    createdAt: {
      type: Date,
      autoValue: function () {
        if (this.isInsert) {
          return new Date;
        } else {
          this.unset();
        }
      },
      denyUpdate: true
    }
  }
});

Persons.helpers({
  fullName: function () {
    return this.firstName + ' ' + this.lastName;
  }
});

Persons.simpleSchema().messages({
  notUnique: "Only one of each last name allowed"
});

var Schemas = {};

UI.registerHelper("Schemas", Schemas);

Schemas.ContactForm = new SimpleSchema({
  name: {
    type: String,
    label: "Your name",
    max: 50
  },
  email: {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
    label: "E-mail address"
  },
  message: {
    type: String,
    label: "Message",
    max: 1000
  }
});
Schemas.ContactForm.messages({
  'regEx email': "[label] is not a valid e-mail address"
});

Dates = new Meteor.Collection("dates", {
  schema: {
    date: {
      type: Date,
      optional: true
    },
    dateTime: {
      type: Date,
      optional: true
    },
    dateTimeLocal: {
      type: Date,
      optional: true
    }
  }
});

FieldValueIs = new Meteor.Collection("FieldValueIs", {
  schema: {
    a: {
      type: String,
      allowedValues: ["foo", "bar"]
    },
    b: {
      type: String
    }
  }
});

FieldValueContains = new Meteor.Collection("FieldValueContains", {
  schema: {
    a: {
      type: [String],
      allowedValues: ["foo", "bar"]
    },
    b: {
      type: String
    }
  }
});

if (Meteor.isClient) {
  SimpleSchema.debug = true;

  Session.setDefault("showPersonForm", true);

  Meteor.subscribe("docs");
  Meteor.subscribe("persons");
  Meteor.subscribe("dates");

  var contactCB = {
    after: {
      sendEmail: function() {
        console.log("after sendEmail hook");
      }
    },
    onSubmit: function() {
      console.log("onSubmit hook");
      //this.resetForm();
      //return false;
    }
  };

  AutoForm.hooks({
    docForm: {
      before: {
        insert: function(doc) {
          console.log("before.insert received document", doc);
          return doc;
        }
      },
      docToForm: function(doc) {
        if (_.isArray(doc.optionalStringArray)) {
          doc.optionalStringArray = doc.optionalStringArray.join(", ");
        }
        return doc;
      },
      formToDoc: function(doc) {
        if (typeof doc.optionalStringArray === "string") {
          doc.optionalStringArray = doc.optionalStringArray.split(",");
        }
        return doc;
      }
    },
    contactForm: contactCB,
    contactForm2: contactCB,
    contactForm3: contactCB,
    personsForm: {
      before: {
        remove: function(id) {
          var name = Persons.findOne(id).fullName;
          return confirm("Remove " + name + "?");
        }
      }
    }
  });

  AutoForm.addHooks(['docForm', 'datesForm1', 'datesForm2', 'datesForm3', 'myQuickForm'], {
    after: {
      insert: function(error, result) {
        if (error) {
          console.log("Insert Error:", error);
        } else {
          console.log("Insert Result:", result);
        }
      },
      update: function(error) {
        if (error) {
          console.log("Update Error:", error);
        } else {
          console.log("Updated!");
        }
      },
      remove: function(error) {
        console.log("Remove Error:", error);
      }
    }
  });

  AutoForm.addHooks(null, {
    onSubmit: function () {
      console.log("onSubmit ALL FORMS!", arguments);
    }
  });

  Documents.simpleSchema().validator(function(key, val, def) {
    if (val === "d") {
      return "noD";
    }
    return true;
  });

  Template.example.docsCollection = function() {
    return Documents;
  };

  Template.example.selectedDoc = function() {
    return Documents.findOne(Session.get("selectedDoc"));
  };

  Template.example.newDocMode = function() {
    return !Session.get("selectedDoc");
  };

  Template.example.tester = {};

  Template.datesForm.dateDoc = function() {
    return null;
    //return Dates.findOne({_id: "pR95N5sxMTsaXe8e8"});
  };

  Template.datesForm.dateTimeDoc = function() {
    return null;
    //return Dates.findOne({_id: "TfFqjdJ6EYfjAdhE3"});
  };

  Template.datesForm.dateTimeLocalDoc = function() {
    return null;
    //return Dates.findOne({_id: "pMcpm4vxkA5Hq4SyM"});
  };

  Template.datesForm.today = function() {
    return dateToDateString(new Date);
  };

  UI.body.testData = function bodyTestDataHelper() {
    if (Session.get("selectedDoc")) {
      return {docFormType: "update"};
    } else {
      return {docFormType: "insert"};
    }
  };

  var dateToDateString = function(date) {
    var m = (date.getMonth() + 1);
    if (m < 10) {
      m = "0" + m;
    }
    var d = date.getDate();
    if (d < 10) {
      d = "0" + d;
    }
    return date.getFullYear() + '-' + m + '-' + d;
  };

  Template.docTable.documents = function() {
    return Documents.find();
  };

  Template.example.events({
    'click .docSelect': function(e, t) {
      e.preventDefault();
      AutoForm.resetForm("docForm");
      Session.set("selectedDoc", this._id);
    },
    'click .docClear': function(e, t) {
      e.preventDefault();
      AutoForm.resetForm("docForm");
      Session.set("selectedDoc", null);
    }
  });

  Template.virtualFields.persons = function() {
    return Persons.find().fetch();
  };

  Template.virtualFields.showPersonForm = function () {
    return Session.get("showPersonForm");
  };

  Template.reactiveCurrentValue.currentAFieldValue = function () {
    return AutoForm.getFieldValue("reactiveCurrentValueForm", "a") || "not selected";
  };

  UI.registerHelper("numSelectOptions", function(options) {
    return [
      {label: "One", value: 1},
      {label: "Two", value: 2},
      {label: "Three", value: 3}
    ];
  });

  UI.registerHelper("log", function(what, who) {
    console.log(what, who);
  });
}

if (Meteor.isServer) {

  _.each([Documents, Persons, Dates, FieldValueIs, FieldValueContains], function (collection) {
    collection.allow({
      insert: function() {
        return true;
      },
      update: function() {
        return true;
      },
      remove: function() {
        return true;
      },
      fetch: []
    });
  });

  Meteor.publish("docs", function() {
    return Documents.find();
  });
  Meteor.publish("persons", function() {
    return Persons.find();
  });
  Meteor.publish("dates", function() {
    return Dates.find();
  });

  Meteor.methods({
    sendEmail: function(doc) {
      check(doc, Schemas.ContactForm);
      var text = "Name: " + doc.name + "\n\n"
              + "Email: " + doc.email + "\n\n\n\n"
              + doc.message;

      console.log("Sent E-mail:\n\n" + text);
      sleep(4000); //simulate real delay
      return true;
    }
  });

  Meteor.startup(function() {
    //Documents.remove({});
  });
}

function sleep(ms) {
  var done = Date.now() + ms;
  while (Date.now() < done) { /* do nothing */
  }
}