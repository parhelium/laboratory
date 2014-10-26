if (Meteor.isClient) {

  Template.test.rendered = function(){
      var evt = new Event();
      var    m = new Magnifier(evt);
      console.log(m,evt)
      m.attach({
          thumb: '#thumb',
          large: 'http://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Starry_Night_Over_the_Rhone.jpg/400px-Starry_Night_Over_the_Rhone.jpg',
          largeWrapper: 'preview'
      });
  }
}

