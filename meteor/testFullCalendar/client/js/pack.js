Meteor.subscribe("reqEvents");

// allReqsCursor = Requests.find();
var calendar = null;

// var handle = allReqsCursor.observeChanges({
//   added: function (id, user) {
//     console.log("Request added");
//   },
//   removed: function () {
//     console.log("Request removed");
//   },
//   changed: function() {
//     console.log("Request changed");
// //    $('#calendar').fullCalendar().today();
//   }
// });

Template.packLayout.rendered = function(){
  calendar = $('#calendar').fullCalendar({
    dayClick:function( date, allDay, jsEvent, view ) {
      Requests.insert({title:'Request',start:date,end:date,color:'red',className:'todo'});
      Session.set('lastMod',new Date());
    },
    eventClick:function(reqEvent,jsEvent,view){
      Session.set('editingReqEvent',reqEvent.id);
      Session.set('showEditEvent',true);
    },
    eventDrop:function(reqEvent){
      Requests.update(reqEvent.id, {$set: {start:reqEvent.start,end:reqEvent.end}});
      Session.set('lastMod',new Date());
    },
    events: function(start, end, callback) {
      var events = [];
      reqEvents = Requests.find();
      reqEvents.forEach(function(evt){
        event = {id:evt._id,title:evt.title,start:evt.start,end:evt.end,color:evt.color};
        events.push(event);
      })
      callback(events);
    },
    editable:true,
    weekMode: 'liquid',
  }).data().fullCalendar;
  console.log(calendar);
  window.c = calendar;
};

Template.packLayout.helpers ({
  data: function() {
    allReqsCursor = Requests.find();

    var handle = allReqsCursor.observeChanges({
      added: function (id, fields) {
        console.log("Request added");
      }, // Use either added() OR(!) addedBefore()
      // addedBefore: function (id, fields, before) {
      //   console.log("Request addedBefore");
      // },
      changed: function (id, fields) {
        console.log("id: " +id);
        console.log(fields);
        if(calendar) {
          //console.log(calendar);
          //calendar.fullCalendar('today');
          //calendar.fullCalendar('rerenderEvents');
          //calendar.fullCalendar('refresh');
        }
      },
      // movedBefore: function (id, fields) {
      //   console.log("Request movedBefore");
      // },
      removed: function (id) {
        console.log("Request removed");
      }
    });
    return allReqsCursor;
  }
});

Template.packLayout.showEditEvent = function(){
  return Session.get('showEditEvent');
}

Template.editEvent.evt = function(){
   var reqEvent = Requests.findOne({_id:Session.get('editingReqEvent')});
   //console.log(reqEvent);
   return reqEvent
}

Template.packLayout.lastMod = function(){
  return Session.get('lastMod');
}

// Template.editEvent.events({
//   'click .save':function(evt,tmpl){
//     updateReqEvent(Session.get('editing_reqEvent'),tmpl.find('.title').value);
//     Session.set('editing_event',null);
//     Session.set('showEditEvent',false);
//     Session.set('lastMod',new Date());
//   }
// })

//var updateReqEvent = function(id,title){
//  Requests.update(id, {$set: {title:title}});

Template.editEvent.events ({
	'click #closeEdit': function(evt) {
		evt.preventDefault();
		Session.set('showEditEvent',false);
		Session.set('lastMod', new Date());
	},
  'click #packed': function(evt) {
    //console.log(Session.get('editingReqEvent'));
    if(packed.checked){
      console.log("Packed checked");
      Requests.update({_id:Session.get('editingReqEvent')}, {$set: {packedBy: Meteor.userId(), color:'blue'}});
    }
    else{
      console.log("Packed not checked");
      Requests.update({_id:Session.get('editingReqEvent')}, {$set: {packedBy: null, deliveredBy: null, color:'red'}});
    }
  },
  'click #delivered': function(evt) {
    if(delivered.checked){
      //console.log("Delivered checked");
      Requests.update({_id:Session.get('editingReqEvent')}, {$set: {deliveredBy: Meteor.userId(), color:'green'}});
    }
    else{
      console.log("Delivered not checked");
      Requests.update({_id:Session.get('editingReqEvent')}, {$set: {deliveredBy: null, color:'blue'}});  
    }
  }
})

UI.registerHelper('arrayify',function(req) {


	
})

Template.editEvent.helpers ({
  isPacked: function(evt) {
    if(evt.packedBy) {
      return {checked:"checked"};
    }
  },
  isDelivered: function(evt) {
    if(evt.deliveredBy) {
      return {checked:"checked"};
    }
  },
  disDelivered: function(evt) {
    val = true;
    if(evt.packedBy) {
      val = false;
    }
    //console.log("disDelivered: " +val);
    return val;
  }
})