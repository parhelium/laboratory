/***********************
* Adobe Edge Animate Composition Actions
*
* Edit this file with caution, being careful to preserve 
* function signatures and comments starting with 'Edge' to maintain the 
* ability to interact with these actions from within Adobe Edge Animate
*
***********************/
(function($, Edge, compId){
var Composition = Edge.Composition, Symbol = Edge.Symbol; // aliases for commonly used Edge classes

   //Edge symbol: 'stage'
   (function(symbolName) {
      
      
      Symbol.bindElementAction(compId, symbolName, "document", "compositionReady", function(sym, e) {
         // insert code to be run when the composition is fully loaded here
         
         //load Greensock
         yepnope(
         {
         	nope:[
         	'js/greensock/minified/plugins/ThrowPropsPlugin.min.js'
         
         	], 
         	complete: init 
         
         }
         )
	     var body, stage, stageWidth, stageHeight, stageParent, dial, dialDragger, blueDialBg, whiteTopDial, ring, numItems, rotationSnap, imageSymbolViewPort, 
	     imageSymbolContainer, mainTitleWidth, mainImageWidth, mainImageHeight, titleContainer, titleViewPort, mainImageSymbolsArray, dialIcons, isDevice, interactionUp, interactionDown, currentIcon, 
	     currentImageSymbolId, oldImageSymbolId, mainTimeline, nestedTimelineTweenDuration;

	     //constants
	     var MAX_DIAL_ROTATION,  MAIN_TITLE_FONT_SIZE, MAIN_TITLE_FONT_COLOR, EASE_TYPE, MAIN_TITLES_ARRAY, EDGE_RESISTANCE, TITLE_SHADOW;
	 

        function init (){

         	//set up device/desktop specific interactions
          	isDevice = (/android|webos|iphone|ipad|ipod|blackberry/i.test(navigator.userAgent.toLowerCase()));

			if(isDevice) {

			  interactionUp = "touchend";
			  interactionDown = "touchstart";
			  //interactionOver = interactionDown;

			} else {

			  interactionUp = "mouseup";
			  interactionDown = "mousedown";
			  //interactionOver = ""mouseover;

			};

            //reference to the stage, body and stage parent
            body = $("body");
         	stage = $("#Stage");
         	stageParent = stage.parent();

         	//stage dimensions
         	stageWidth = stage.width();
         	stageHeight = stage.height();


         	//references to items (and their dimensions) on the stage
         	dial = sym.$("dial");
         	imageSymbolViewPort = sym.$("imageSymbolViewPort");
         	imageSymbolContainer = sym.$("imageSymbolContainer");
         	titleContainer = sym.$("titleContainer");
         	titleViewPort = sym.$("titleViewPort");
         	blueDialBg = sym.$('blueDialBg');
         	whiteTopDial = sym.$('whiteTopDial');
         	dialShadow = sym.$('dialShadow');
         	ring = sym.$('ring');

         	mainImageWidth = imageSymbolViewPort.width();
         	mainImageHeight = imageSymbolViewPort.height();
         	mainTitleWidth = titleViewPort.width();

         	//this has no effect on tweens. Don't bother editing it
         	nestedTimelineTweenDuration = 1;

         	//initializes the currentImageSymbolId so we know which is displayed on load
            currentImageSymbolId = 0;
            //there's no oldImageSymbolId (because we haven't dragged yet) yet so it's set to -1
            oldImageSymbolId = -1;

            //new TimelineMax that will store the image symbols' timelines
            mainTimeline = new TimelineMax({paused:true, immediateRender:true});

            //stores all the main image symbols that scroll
         	mainImageSymbolsArray = [];

         	//stores the icon symbols
         	dialIconElementsArray = [];


         	//*******************************************************vv  CHANGES THE VALUES BELOW vv**************************************************************

         	//you may need to change the titleContainer, titleViewPort dimensions (on the stage)
         	MAIN_TITLE_FONT_SIZE = 26;

         	TITLE_SHADOW = 'rgba(5, 5, 5, 0.45)';
         	//font color
         	MAIN_TITLE_FONT_COLOR = 'rgba(255, 255, 255, 1)';

         	//how far round you want the dial to rotate in degrees (values of 180 - 300 work best)
         	//this also affects the spread of the icons around the dial
         	MAX_DIAL_ROTATION = 240;

         	//the ease for the dial and image dragging - here are some other ones (just uncomment)
         	EASE_TYPE = Power4.easeOut;
         	//EASE_TYPE = Elastic.easeOut;
         	//EASE_TYPE = Power2.easeInout;
         	//EASE_TYPE = Back.easeOut.config(0.83);


         	//lower values mean more exaggerated perspective
         	DEFAULT_PERSPECTIVE = 1100;

         	//how much bounce an overdrag will have - 0 means lots of bounce - 1 means not overdrag
         	EDGE_RESISTANCE = 0.98;

         	//how much resistance when you drag. A low value means the dragged item stays close with your mouse/finger - high value means it drifts 
         	//(this is useful if you find the throw is too aggressive)
         	DRAG_RESISTANCE = 0.2;

         	MAIN_TITLES_ARRAY = [
         	'Home', 
         	'Edit', 
         	'Retrigger', 
         	'Love', 
         	'Animation', 
         	'Pop In'
         	];

         	//do you want the image symbols' animations to play from the start every time you land on them? If so set to true
         	RETRIGGER_ANIMATIONS = true;

         	//to change the images and dial icons look in the library and edit them there


         	//*******************************************************^^ CHANGES THE VALUES ABOVE ^^**************************************************************


         	
         	//used to determine how many items there are - the number of DialItemSymbols and ImageSymbols MUST match this number
         	//and they must be named DialItemSymbol0, DialItemSymbol1, DialItemSymbol2 and ImageSymbol0, ImageSymbol1, ImageSymbol2 etc
         	//If you add a new title in the MAIN_TITLES_ARRAY then you must add a new DialItemSymbol and a new ImageSymbol to the library
         	numItems = MAIN_TITLES_ARRAY.length;

         	//the steps of rotation based on the number of images/titles
         	rotationSnap = (MAX_DIAL_ROTATION/numItems);

         	//set the body's color and prevent text being selected
			TweenMax.set(body, {
				backgroundColor:'#eaeff0',
				userSelect:'none'
			});

			//set the persepctive on the container that holds the image symbols (and set its alpha to 0 as we'll fade it up later)
			TweenMax.set(imageSymbolContainer, {
				perspective: DEFAULT_PERSPECTIVE,
				alpha:0
			});

			//Main setup loop
			var i = -1;
			while (++i < numItems) {

				var dialItemSymbol = sym.createChildSymbol("DialItemSymbol" + i, dial);
				var dialItemElement = dialItemSymbol.getSymbolElement();

				//the dial image symbol from the library
				TweenMax.set(dialItemElement, {
					position:'absolute',
					x:(dial.width()/2) - (dialItemElement.width()/2),
					y:(dial.height()/2) - (dialItemElement.height()/2),
					rotation: rotationSnap * i
				});

				//the editable icon image symbol inside the DialItemSymbol
				var dialIcon = dialItemElement.children()[0];
				//add it to an array for use later
				dialIconElementsArray.push(dialIcon);

				//scrolling main images
				var mainImageSymbol = sym.createChildSymbol('ImageSymbol'+i, imageSymbolContainer);
				var mainImageElement = mainImageSymbol.getSymbolElement();

				TweenMax.set(mainImageElement, {
					position:'absolute',
					x:i * mainImageWidth
				});
				
				//push the image symbols into an array for use later
				mainImageSymbolsArray.push(mainImageSymbol);

				//scrolling titles
				var mainTitle = $('<div>');
				mainTitle.html(MAIN_TITLES_ARRAY[i]);
				mainTitle.appendTo(titleContainer);
				var destX = (numItems-1) * mainTitleWidth;
				TweenMax.set(mainTitle, {
					position:'absolute',
					width:mainTitleWidth,
					height:titleContainer.height(),
					x: destX- (i * mainTitleWidth),
					fontFamily:'Helvetica, Arial, sans-serif',
					fontSize:MAIN_TITLE_FONT_SIZE,
					color:MAIN_TITLE_FONT_COLOR,
					textAlign:'center',
					textShadow:"0px 1px 3px " + TITLE_SHADOW
				});
	

			}

			//update the heights and widths of all containers
			imageSymbolContainer[0].style.width = imageSymbolContainer[0].scrollWidth + 'px';
			titleContainer[0].style.width = titleContainer[0].scrollWidth + 'px';


			var i = mainImageSymbolsArray.length;
			while (--i > -1) {
			//for(var i = 0; i < mainImageSymbolsArray.length; i ++ ){
				var nestedImageTimeline = new TimelineMax({immediateRender:false});
				var scaleArray = [];
				var rotationYArray = [];
				var autoAlphaArray = [];
				var zArray = [];
				for (var j = 0; j < mainImageSymbolsArray.length; j++){

					if(i!=j){

						if(i<j){

							rotationYArray.push(45);
						} else {

							rotationYArray.push(-90);
						}

					} else {

							rotationYArray.push(0);
					}

					scaleArray.push((i!=j)? 0.5 : 1);
					var mainImageRef = mainImageSymbolsArray[i].getSymbolElement();
					nestedImageTimeline.to(mainImageRef, nestedTimelineTweenDuration, {
						scale:scaleArray[j], 
						rotationY:rotationYArray[j],
						ease:Power2.easeInOut
					});

					mainTimeline.add(nestedImageTimeline, 0);

					TweenMax.set(mainImageRef, {
						scale:scaleArray[j],
						rotationY:rotationYArray[j]
					})

				}

			}

			
			//now offset the entire set of main titles so they go in the opposite direction to the main images
			TweenMax.set(titleContainer, {

				x:-(titleContainer.width()) + mainTitleWidth
			})


			//Dial dragger
			dialDragger = Draggable.create(dial, {

				type:'rotation',
				bounds:{minRotation:0, maxRotation:-MAX_DIAL_ROTATION + rotationSnap},
				throwProps:true,
				dragResistance:DRAG_RESISTANCE,
				edgeResistance:EDGE_RESISTANCE, 
				throwResistance:2000,
			    onDrag:dialRotationUpdate,
			    onThrowUpdate:dialRotationUpdate,
			    onThrowComplete:throwComplete,
				zIndexBoost:false,
				force3D:false,
			    ease:EASE_TYPE,
				snap:function(endValue){

					return Math.round(endValue/rotationSnap) *  rotationSnap;
				}
			});


			//main image dragger
			imageDragger = Draggable.create(imageSymbolContainer, {
				bounds:{maxX:0, minX:(-imageSymbolContainer.width()) + mainImageWidth},
			    type:"x", 
			    maxDuration:1,
			    throwProps:true, 
				dragResistance:DRAG_RESISTANCE,
				edgeResistance:EDGE_RESISTANCE, 
				throwResistance:2000,
			    onDrag:mainImagePosXUpdate,
			    onThrowUpdate:mainImagePosXUpdate,
			    onThrowComplete:throwComplete,
				zIndexBoost:false,
				force3D:false,
			    ease:EASE_TYPE,
			    snap:function(endValue) { 
			        return Math.round(endValue / mainImageWidth) * mainImageWidth;
			    }
			});		

			updateLoop();
						
			//wait 1 second then fade up/animate in all the elements
			TweenMax.delayedCall(1, showAll);	

	

		}//end of init function




		function showAll(){
			
			//fade/scale up draggable dial which contains the icons
			TweenMax.fromTo(dial, 0.9, {

				scale:0,
			}, {
				autoAlpha:1,
				scale:1,
				ease:Back.easeOut.config(0.4)
			});


			//fade up dialShadow
			TweenMax.to(dialShadow, 1,  {
				autoAlpha:0.38
		
			});

			//fade/scale up whiteTopDial
			TweenMax.fromTo(whiteTopDial, 0.8, {

				scale:0
			}, {
				autoAlpha:1,
				scale:1,
				ease:Back.easeOut.config(0.4)
			});

			//fade/scale up blueDialBg
			TweenMax.fromTo(blueDialBg, 0.6, {

				scale:0
			}, {

				autoAlpha:1,
				scale:1,
				ease:Back.easeOut.config(0.4)
			});

			//fade/scale up the ring around the dial
			TweenMax.fromTo(ring, 0.4, {

				autoAlpha:0,
				scale:0.5
			}, {

				autoAlpha:1,
				scale:0.89,
				ease:Back.easeOut.config(0.4)
			});

			//fade up titles
			TweenMax.to(titleViewPort, 0.3,  {
			
				alpha:1
		
			});


			//after 1 second fade/scale up the container that holds the images
			TweenMax.to(imageSymbolContainer, 2, {
				delay:1,
				alpha:1,
				onComplete:throwComplete
			});





		}

        function dialRotationUpdate(){

			//tells the image container to go the correct X pos based on the dial's rotation
  			var imageSymbolContainerDestX = (this.rotation/MAX_DIAL_ROTATION) * imageSymbolContainer.width();
			TweenMax.set(imageSymbolContainer, {
				x:imageSymbolContainerDestX
			}
			);

			//tells the titles to go to the correct one based on the dial's rotation (it goes left to right because it's more interesting that way!)
			var titleContainerDestX = (this.rotation/MAX_DIAL_ROTATION) * titleContainer.width();
			TweenMax.set(titleContainer, {
				x:-titleContainer.width() - titleContainerDestX + mainTitleWidth
			}
			);

 				
 			updateLoop();

 			
        }

		function mainImagePosXUpdate (){

			var destRotation = (this.x/imageSymbolContainer.width()) * MAX_DIAL_ROTATION;
			TweenMax.set(dial, {
				rotation:destRotation
			}
			);

			var titleContainerDestX = (this.x/imageSymbolContainer.width()) * titleContainer.width();
			TweenMax.set(titleContainer, {
				x:-titleContainer.width() - titleContainerDestX + mainTitleWidth
			}
			);

 
 			updateLoop();

		}

		function updateLoop (){

			//tells the icons to be scaled/focused based on the image container's position 
			var oldIcon = currentIcon;
			var imageSymbolContainerPosX = imageSymbolContainer[0]._gsTransform.x;

            var slideId = -Math.round(imageSymbolContainerPosX/mainImageWidth );

            currentIcon = dialIconElementsArray[slideId];

            if(oldIcon != currentIcon && slideId > -1 && slideId < numItems){
		
	            for(var i = 0; i < numItems; ++i){

	            	if(i != slideId){

			            TweenMax.to(dialIconElementsArray[i], 0.3, {
			            	alpha:0.5,
			            	scale:0.75
			            });


	            	} else {

			            TweenMax.to(dialIconElementsArray[i], 1, {
			            	alpha:1,
			            	scale:1
			            });
	            	}
	            }


            	
            }

            //values that decide where to be in the main image timeline (that contains the nested ones)
            var percent = (dial[0]._gsTransform.rotation/MAX_DIAL_ROTATION);
            var frame = -percent * mainTimeline.duration();

            //tells the main image timeline where to go based on the drag of either the images or the dial
            //This method actually animates the time (which is super fancy!) - this means you always have a smooth movement but you may not want this
            //as it can feel slightly sluggish. If so comment this out and uncomment the line > mainTimeline.time(frame+nestedTimelineTweenDuration);            
            TweenMax.to(mainTimeline, 1, {
            	time:frame+nestedTimelineTweenDuration,
            	ease:Power4.easeOut
            });

			/*
			//this method is sharper but can feel more responsive - choices, choices!
            mainTimeline.time(frame+nestedTimelineTweenDuration);
            */


            //keeps the perspectiveOrigin in the middle whilst the image container moves - this ensures the image rotationY is always the same for each image
            var perspectivePercent = -(percent * 100) + '% 50%';            
			TweenMax.set([imageSymbolContainer], {
                perspectiveOrigin: perspectivePercent
     

			})

		}

		function throwComplete (){

			//this function decides whether the image symbol's animation has played.
			//If not, play it - if it has played and RETRIGGER_ANIMATIONS is false they will stay in the ir final animation positions
            var slideId = -Math.round((imageSymbolContainer[0]._gsTransform.x)/mainImageWidth );

            if( slideId == currentImageSymbolId && oldImageSymbolId != -1){


            } else {

				oldImageSymbolId = currentImageSymbolId;

				if(mainImageSymbolsArray[oldImageSymbolId].getPosition() > 0){

					if(RETRIGGER_ANIMATIONS){
						mainImageSymbolsArray[oldImageSymbolId].stop(0);
					}
				}

				currentImageSymbolId = slideId;
				if(mainImageSymbolsArray[currentImageSymbolId].getPosition() == 0 || mainImageSymbolsArray[currentImageSymbolId].getPosition() == -1){
						mainImageSymbolsArray[currentImageSymbolId].play(0);

				}

            	
            }

            updateLoop();





		}




      });
      //Edge binding end

      

      Symbol.bindSymbolAction(compId, symbolName, "creationComplete", function(sym, e) {
         var meta1 = "<meta content=\"minimum-scale=1, width=device-width, maximum-scale=1\, user-scalable=no\" name=\"viewport\" />" ;   
         $(meta1).appendTo("body");

      });
      //Edge binding end

   })("stage");
   //Edge symbol end:'stage'

   //=========================================================
   
   //Edge symbol: 'ImageSymbol'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1575, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

   })("ImageSymbol0");
   //Edge symbol end:'ImageSymbol0'

   //=========================================================
   
   //Edge symbol: 'ImageSymbol0_1'
   (function(symbolName) {   
   
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 1000, function(sym, e) {
         sym.stop();

      });
      //Edge binding end

      })("ImageSymbol1");
   //Edge symbol end:'ImageSymbol1'

   //=========================================================
   
   //Edge symbol: 'ImageSymbol1_1'
   (function(symbolName) {   
   
      })("ImageSymbol2");
   //Edge symbol end:'ImageSymbol2'

   //=========================================================
   
   //Edge symbol: 'ImageSymbol2_1'
   (function(symbolName) {   
   
      })("ImageSymbol3");
   //Edge symbol end:'ImageSymbol3'

   //=========================================================
   
   //Edge symbol: 'ImageSymbol3_1'
   (function(symbolName) {   
   
         })("ImageSymbol4");
   //Edge symbol end:'ImageSymbol4'

   //=========================================================
   
   //Edge symbol: 'ImageSymbol4_1'
   (function(symbolName) {   
   
      Symbol.bindElementAction(compId, symbolName, "${ButtonSymbol}", "click", function(sym, e) {
         // Navigate to a new URL in the current window
         // (replace "_self" with appropriate target attribute for a new window)
         window.open("http://chrisgannon.wordpress.com", "_blank");
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${ButtonSymbol}", "touchend", function(sym, e) {
         // Navigate to a new URL in the current window
         // (replace "_self" with appropriate target attribute for a new window)
         window.open("http://chrisgannon.wordpress.com", "_blank");
         

      });
      //Edge binding end

         })("ImageSymbol5");
   //Edge symbol end:'ImageSymbol5'

   //=========================================================
   
   //Edge symbol: 'ButtonSymbol'
   (function(symbolName) {   
   
   })("ButtonSymbol");
   //Edge symbol end:'ButtonSymbol'

   //=========================================================
   
   //Edge symbol: 'DialItemSymbol_1'
   (function(symbolName) {   
   
      })("DialItemSymbol0");
   //Edge symbol end:'DialItemSymbol0'

   //=========================================================
   
   //Edge symbol: 'DialItemSymbol0_1'
   (function(symbolName) {   
   
      })("DialItemSymbol1");
   //Edge symbol end:'DialItemSymbol1'

   //=========================================================
   
   //Edge symbol: 'DialItemSymbol1_1'
   (function(symbolName) {   
   
      })("DialItemSymbol2");
   //Edge symbol end:'DialItemSymbol2'

   //=========================================================
   
   //Edge symbol: 'DialItemSymbol2_1'
   (function(symbolName) {   
   
      })("DialItemSymbol3");
   //Edge symbol end:'DialItemSymbol3'

   //=========================================================
   
   //Edge symbol: 'DialItemSymbol3_1'
   (function(symbolName) {   
   
      })("DialItemSymbol4");
   //Edge symbol end:'DialItemSymbol4'

   //=========================================================
   
   //Edge symbol: 'DialItemSymbol4_1'
   (function(symbolName) {   
   
      })("DialItemSymbol5");
   //Edge symbol end:'DialItemSymbol5'

})(window.jQuery || AdobeEdge.$, AdobeEdge, "EDGE-545038043");