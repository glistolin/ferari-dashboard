angular.module('ferariApp')
	.controller('MapController', [ '$scope','leafletData', 'socketio',  function($scope, leafletData, socketio) {

		var map = L.map('map', {
			zoom: 8,
			center: L.latLng(44.60,16.00),
			layers: L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'),
			useCache: true
		});

		var markers = new L.MarkerClusterGroup().addTo(map);

		socketio.on('message', function (msg) {
			console.log(msg);
			msg = JSON.parse(msg);
			if (msg.hasOwnProperty("latitudes") && msg.hasOwnProperty("longitudes")) {
				markers.addLayer(L.marker([msg.latitudes, msg.longitudes]));
			}
			else {
				markers.addLayer(L.marker([msg.latitude, msg.longitude]));
			}
		});

		/* TO DO 
		MONGO API -->*/

		L.layerJSON({
			//url: "/map",
			propertyLoc: ['latitude','longitude'],
			propertyTitle: 'name',
			minShift: Infinity,        
			caching: true,
			layerTarget: markers
		})
		.addTo(map);
		
	    map.addLayer(markers);
	}])
	.directive('slideable', function () {
	    return {
	        restrict:'C',
	        compile: function (element, attr) {
	            // wrap tag
	            var contents = element.html();
	            element.html('<div class="slideable_content" style="margin:0 !important; padding:0 !important" >' + contents + '</div>');

	            return function postLink(scope, element, attrs) {
	                // default properties
	                attrs.duration = (!attrs.duration) ? '1s' : attrs.duration;
	                attrs.easing = (!attrs.easing) ? 'ease-in-out' : attrs.easing;
	                element.css({
	                	'overflow': 'hidden',
	                	'vertical-align': 'bottom',
	                	'width': '100%',
	                    'height': '0px',
	                    'transitionProperty': 'height',
	                    'transitionDuration': attrs.duration,
	                    'transitionTimingFunction': attrs.easing
	                });
	            };
	        }
	    };
	})
	.directive('slideToggle', function() {
	    return {
	        restrict: 'A',
	        link: function(scope, element, attrs) {
	            var target = document.querySelector(attrs.slideToggle);
	            attrs.expanded = false;
	            element.bind('click', function() {
	                var content = target.querySelector('.slideable_content');
	                if(!attrs.expanded) {
	                    content.style.border = '0px solid rgba(0,0,0,0)';
	                    var y = content.clientHeight;
	                    content.style.border = 0;
	                    target.style.height = y + 'px';
	                } else {
	                    target.style.height = '0px';
	                }
	                attrs.expanded = !attrs.expanded;
	            });
	        }
	    }
	});