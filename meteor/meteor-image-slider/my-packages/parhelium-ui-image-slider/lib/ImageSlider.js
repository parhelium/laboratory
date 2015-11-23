var logger = loggerFactory('ImageSlider');

function getAsync(url) {
    return new Promise(function (resolve, reject) {
        var img = new Image();
        img.onload = resolve;
        img.onerror  = reject;
        img.setAttribute("src",url);
    })
}

ImageSlider = Ractive.extend({
    adapt: ['promise-alt'],
    append: true,

    template: function(){return Ract.getTemplate('ImageSlider')},

    onconstruct:function(options){
        this.options = options;
    },
    computed: {
        index: function(){
            var self = this;
            return Math.abs(self.get('_index')) % self.data.items.length;
        }
    },
    oninit: function () {
        var self = this;
        logger.log("oninit", this)
        // make sure first image in the list is first
        self.set('_index',10000*self.data.items.length);
        self.set('activeImageUrl',self.activeImageUrl);
        self.set('isDotActive',function(idx){
            logger.log('isDotActive : ',idx);
            if(idx == self.get('index')){
                return 'active'
            }else
                return '';
        });
        self.removeArrows();
        self.on({
            onClick      : function(e){
                var value = 0;
                if(self.lastPercentageX < 0.5)
                    value = -1;
                else
                    value = 1;

                self.set('_index', self.get('_index')+value)
            },
            onDotClick      : function(e,idx){
                logger.log('onDotClick -> ', idx,self.get('index'));
                if(idx != null){
                    var diff = self.get('index') - idx;
                    self.set('_index',  self.get('_index') - diff );
                }
            },
            onMouseEnter : function(e){

            },
            onMouseLeave : function(e){
                self.removeArrows();
            },
            onMouseMove:function(e){
                if(!e) return;

                var percentageX = (e.original.offsetX || e.original.layerX) / ( e.original.target.width || e.original.target.naturalWidth );
                var percentageY = (e.original.offsetY || e.original.layerY) / ( e.original.target.height || e.original.target.naturalHeight);
                var obj = {x:percentageX,y:percentageY}

                if(percentageX < 0.5){
                    self.set('leftVisibilityClass', 'disp_block');
                    self.set('rightVisibilityClass','disp_none');
                }else{
                    self.set('leftVisibilityClass', 'disp_none');
                    self.set('rightVisibilityClass','disp_block');
                }
                self.lastPercentageX = percentageX;

            }
        });
    },
    removeArrows:function(){
        var self = this;
        self.set('leftVisibilityClass', 'disp_none');
        self.set('rightVisibilityClass','disp_none');
    },

    activeImageUrl:function(){
        var self =  this;
        var idx = self.get('index');
        logger.log('activeImageUrl | idx = ',idx)
        return self.get('items.'+idx);
    }
});