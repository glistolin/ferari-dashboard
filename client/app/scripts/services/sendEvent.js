'use strict';

/**
 * @ngdoc function
 * @name ferariApp.service:SendEvent
 * @description: Service for sharing data between TableCtrl and EventCounterCtrl
 * # SendEvent
 * Service of the ferariApp
 */

angular.module('ferariApp')
    .factory('SendEvent', ['socketio', function (socketio) {
        
       var redisData  = []

        socketio.on('message', function (msg) {
			redisData.push(JSON.parse(msg));
			console.log('poslan event');
		});

        return redisData;

}]);