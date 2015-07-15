/**
 * jQuery.serialScroll
 * Copyright (c) 2007-2008 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 3/20/2008
 *
 * @projectDescription Animated scrolling of series.
 * @author Ariel Flesler
 * @version 1.2.1
 *
 * @id jQuery.serialScroll
 * @id jQuery.fn.serialScroll
 * @param {Object} settings Hash of settings, it is passed in to jQuery.ScrollTo, none is required.
 * @return {jQuery} Returns the same jQuery object, for chaining.
 *
 * http://flesler.blogspot.com/2008/02/jqueryserialscroll.html
 *
 * Notes:
 *	- The plugin requires jQuery.ScrollTo.
 *	- The hash of settings, is passed to jQuery.ScrollTo, so its settings can be used as well.
 */
;(function( $ ){

	var $serialScroll = $.serialScroll = function( settings ){
		$.scrollTo.window().serialScroll( settings );
	};

	//Many of these defaults, belong to jQuery.ScrollTo, check it's demo for an example of each option.
	//@see http://flesler.webs/jQuery.ScrollTo/
	$serialScroll.defaults = {//the defaults are public and can be overriden.
		duration:1000, //how long to animate.
		axis:'x', //which of top and left should be scrolled
		event:'click', //on which event to react.
		start:0, //first element (zero-based index)
		step:1, //how many elements to scroll on each action
		lock:true,//ignore events if already animating
		cycle:true, //cycle endlessly ( constant velocity )
		constant:true //use contant speed ?
		/*
		navigation:null,//if specified, it's a selector a collection of items to navigate the container
		target:null, //if specified, it's a selector to the element to be scrolled.
		interval:0, //it's the number of milliseconds to automatically go to the next
		lazy:false,//go find the elements each time (allows AJAX or JS content, or reordering)
		stop:false, //stop any previous animations to avoid queueing
		force:false,//force the scroll to the first element on start ?
		jump: false,//if true, when the event is triggered on an element, the pane scrolls to it
		items:null, //selector to the items (relative to the matched elements)
		prev:null, //selector to the 'prev' button
		next:null, //selector to the 'next' button
		onBefore: function(){}, //function called before scrolling, if it returns false, the event is ignored
		exclude:0 //exclude the last x elements, so we cannot scroll past the end
		*/
	};

	$.fn.serialScroll = function( settings ){
		settings = $.extend( {}, $serialScroll.defaults, settings );
		var event = settings.event, //this one is just to get shorter code when compressed
			step = settings.step, // idem
			lazy = settings.lazy;//idem

		return this.each(function(){
			var 
				context = settings.target ? this : document, //if a target is specified, then everything's relative to 'this'.
				$pane = $(settings.target || this, context),//the element to be scrolled (will carry all the events)
				pane = $pane[0], //will be reused, save it into a variable
				items = settings.items, //will hold a lazy list of elements
				active = settings.start, //active index
				auto = settings.interval, //boolean, do auto or not
				nav = settings.navigation, //save it now to make the code shorter
				timer; //holds the interval id

			if( !lazy )//if not lazy, go get the items now
				items = getItems();

			if( settings.force )
				jump( {}, active );//generate an initial call

			// Button binding, optionall
			$(settings.prev||[], context).bind( event, -step, move );
			$(settings.next||[], context).bind( event, step, move );

			// Custom events bound to the container
			if( !pane.ssbound )//don't bind more than once
				$pane
					.bind('prev.serialScroll', -step, move ) //you can trigger with just 'prev'
					.bind('next.serialScroll', step, move ) //for example: $(container).trigger('next');
					.bind('goto.serialScroll', jump ); //for example: $(container).trigger('goto', [4] );
			if( auto )
				$pane
					.bind('start.serialScroll', function(e){
						if( !auto ){
							clear();
							auto = true;
							next();
						}
					 })
					.bind('stop.serialScroll', function(){//stop a current animation
						clear();
						auto = false;
					});
			$pane.bind('notify.serialScroll', function(e, elem){//let serialScroll know that the index changed externally
				var i = index(elem);
				if( i > -1 )
					active = i;
			});
			pane.ssbound = true;//avoid many bindings

			if( settings.jump )//can't use jump if using lazy items and a non-bubbling event
				(lazy ? $pane : getItems()).bind( event, function( e ){
					jump( e, index(e.target) );
				});

			if( nav )
				nav = $(nav, context).bind(event, function( e ){
					e.data = Math.round(getItems().length / nav.length) * nav.index(this);
					jump( e, this );
				});

			function move( e ){
				e.data += active;
				jump( e, this );
			};
			function jump( e, button ){
				if( !isNaN(button) ){//initial or special call from the outside $(container).trigger('goto',[index]);
					e.data = button;
					button = pane;
				}

				var
					pos = e.data, n,
					real = e.type, //is a real event triggering ?
					$items = settings.exclude ? getItems().slice(0,-settings.exclude) : getItems(),//handle a possible exclude
					limit = $items.length,
					elem = $items[pos],
					duration = settings.duration;

				if( real )//real event object
					e.preventDefault();

				if( auto ){
					clear();//clear any possible automatic scrolling.
					timer = setTimeout( next, settings.interval ); 
				}

				if( !elem ){ //exceeded the limits
					n = pos < 0 ? 0 : limit - 1;
					if( active != n )//we exceeded for the first time
						pos = n;
					else if( !settings.cycle )//this is a bad case
						return;
					else
						pos = limit - n - 1;//invert, go to the other side
					elem = $items[pos];
				}

				if( !elem || real && active == pos || //could happen, save some CPU cycles in vain
					settings.lock && $pane.is(':animated') || //no animations while busy
					real && settings.onBefore && //callback returns false ?
					settings.onBefore.call(button, e, elem, $pane, getItems(), pos) === false ) return;

				if( settings.stop )
					$pane.queue('fx',[]).stop();//remove all its animations

				if( settings.constant )
					duration = Math.abs(duration/step * (active - pos ));//keep constant velocity

				$pane
					.scrollTo( elem, duration, settings )//do scroll
					.trigger('notify.serialScroll',[pos]);//in case serialScroll was called on this elem more than once.
			};
			function next(){//I'll use the namespace to avoid conflicts
				$pane.trigger('next.serialScroll');
			};
			function clear(){
				clearTimeout(timer);
			};
			function getItems(){
				return $( items, pane );
			};
			function index( elem ){
				if( !isNaN(elem) ) return elem;//number
				var $items = getItems(), i;
				while(( i = $items.index(elem)) == -1 && elem != pane )//see if it matches or one of its ancestors
					elem = elem.parentNode;
				return i;
			};
		});
	};

})( jQuery );