
Sites = new Meteor.Collection("sites");

if (Meteor.isClient) {
  Template.hello.sites = function () {
    var cursor =  Sites.find({sub:"page"});
    console.log("sites = ", cursor.count())  
    return cursor;
  };
  //Meteor.subscribe("page", 10,10);
}
if (Meteor.isServer) {
  Meteor.startup(function () {
     if (Sites.find().count() === 0) {
         for(var i = 0; i < 5000; i++){
             Sites.insert({
                name:"name " + i,
                value:i
             })
         }
     }
     Meteor.publish("page", function(pageNumber, amountPerPage){
        var skip  = (pageNumber-1)*amountPerPage;
        var limit = amountPerPage;
        console.log("sitesOnPage \nskip=", skip,"\nlimit=", limit)
        return Sites.find({},{skip:skip, limit:limit, transform:function(doc){
            doc.sub = "page"
            return doc;
        }});
    })
     Meteor.publish("top-ideal",function(){
        return Sites.find({ value: { $gt: 25, $lt:30} },{transform:function(doc){
            doc.sub = "top";
            return doc;
        }});
     })
     Meteor.publish("top",function(){
        var self = this;
        var cursor =  Sites.find({ value: { $gt: 25, $lt:30} })
        cursor.observe({
            added:function(doc){
                doc.sub = "top";
                console.log("top.observe.added : ", doc);
                return doc;
            }
        })
        return cursor;
     })
  });
}
