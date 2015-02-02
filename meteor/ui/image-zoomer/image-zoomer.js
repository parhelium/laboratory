if (Meteor.isClient) {
  Template.test.helpers({

  })

  Template.test.rendered = function(){
      var ractive = new Ractive({
          el: ".imageZoom",
          template:Ract.getTemplate('image-zoomer'),
          components: { ImageZoom: ImageZoom }
      });
  }
}

