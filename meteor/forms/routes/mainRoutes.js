RV = new Mongo.Collection(null);
RV.insert(  { label :'Male',   value:'male' })
RV.insert(  { label :'Female', value:'female' })




// Home Route
Router.route('/', function () {
  this.render('userForm',{
    data:function(){

        return {
          antiFormDoc:{
            firstName:'Kuba',
            lastName:'Wyrobek',
            gender : RV.find()
          },
          antiFormError:{
          }
        }
      }
    })
  SEO.set({ title: 'Home - ' + Meteor.App.NAME });
});
