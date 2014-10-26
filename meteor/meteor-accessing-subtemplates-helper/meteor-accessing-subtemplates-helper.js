if (Meteor.isClient) {
    Template.myPage.rendered = function(){
        this.myWidgetInstance = UI.render(Template.myWidget)
        UI.insert(this.myWidgetInstance, $('.widgetContainer')[0]);
    }

    Template.myPage.events({
        'click button': function(e, template){
             // I don't want this logic to live inside of mywidget.js.
             // I also don't want this template to know about the <input> field directly.
             var val = template.myWidgetInstance.getValue();
             console.log(val);
        }
    });
    Template.myWidget.getValue = function(){
        return $('input').val();
    }
}