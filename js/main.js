$(document).ready(function(e) {
  
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());
				
		var globalID;
		var frames = $('section.carousel').find('article').length;
		var fC = new Array();
		
		for(i=0;i<frames;i++){
				$('section.carousel').find('article:nth-child('+(i+1)+')').addClass('frame'+(i+1));
				fC.push('frame'+(i+1));
				console.log(fC[i]);
		}
		
		var ticker = 0;
		var frameLength = 2; // In seconds
		$('.'+fC[ticker]).addClass('show');
		
		// Timer
		var fill = (100/frameLength)/60;
		var fillOut = 0;
		var nextPoint = 100;
		var loaderColor = 'rgba(0,0,0,1)';
		$('section.carousel').append('<span></span>');
		
		//Pager
		$('section.carousel').append('<ul></ul>');
		for(i=1;i<=frames;i++){
				$('section.carousel ul').append('<li id="pager' + i + '"></li>');
		}
		$('#pager'+(ticker+1)).addClass('active');
						
						
		
		
				
		$('section.carousel li').on('click', function(){
				var cap = $(this).attr('id').substr(5);
				fillOut = 0;
				ticker = cap-1;
				$('section.carousel li').removeClass('active');
				$(this).addClass('active');
				$('section.carousel article').removeClass('show');
				$('.frame'+cap).addClass('show');
		});
		//animation
		function draw() {
				
				setTimeout(function(){
						globalID = requestAnimationFrame(draw);		
						/*
						ticker++;
						if(ticker>=frames){
								fillOut = 0;
								$('.'+fC[ticker-1]).removeClass('show');
								$('#pager'+ticker).removeClass('active');
								ticker = 0;
								$('.'+fC[ticker]).addClass('show');
								
								$('#pager'+(ticker+1)).addClass('active');
						} else {
								fillOut = 0;
								$('.'+fC[ticker-1]).removeClass('show');
								$('.'+fC[ticker]).addClass('show');
								
								$('#pager'+ticker).removeClass('active');
								$('#pager'+(ticker+1)).addClass('active');
						}
						*/
				
				}, 1000 * frameLength);
		}
		globalID = requestAnimationFrame(draw);		
		
		
		function drawTimer() {
				requestAnimationFrame(drawTimer);
				// display how long till next frame
				fillOut = fillOut+fill;
				
				$('section.carousel span').css({'box-shadow': '0px ' + -fillOut + 'px ' + loaderColor + 'inset'});
				
				if(ticker>=(frames-1) && fillOut>=100){
						console.log('go');
						ticker++;
								fillOut = 0;
								$('.'+fC[ticker-1]).removeClass('show');
								$('#pager'+ticker).removeClass('active');
								ticker = 0;
								$('.'+fC[ticker]).addClass('show');
								
								$('#pager'+(ticker+1)).addClass('active');
								
				} else if(fillOut>=100){
						ticker++;
								fillOut = 0;
								$('.'+fC[ticker-1]).removeClass('show');
								$('.'+fC[ticker]).addClass('show');
								
								$('#pager'+ticker).removeClass('active');
								$('#pager'+(ticker+1)).addClass('active');	
				}
		}
		drawTimer();
});