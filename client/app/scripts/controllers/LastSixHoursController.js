'use strict'

angular.module('ferariApp')
.controller('LastSixHoursCtrl', ['$scope', '$mdDialog', '$http', function ($scope, $mdDialog, $http) {
	$scope.showBoxOne = false;
    $scope.showBoxTwo = false;

    $scope.event_name = '';

   	$http({
        method: 'GET',
        url: '/sixhours' 
    }).then(function ( json ) {
        $scope.data = formatData(json.data);  // format received data

        // generate chart
        $scope.mini_sixhours = c3.generate({
          bindto: d3.select('#mini_sixhours'),
          size: {
            height: 88 
          },
          data: {
            json: $scope.data,
            keys: {
                    value: ['FrequentLongCallsAtNight', 'LongCallAtNight', 'FrequentLongCalls', 'FrequentEachLongCall', 'ExpensiveCalls'],
            },
            type: 'bar',
            colors: {
                FrequentLongCallsAtNight: '#3F51B5',
                LongCallAtNight: '#FF4081',
                FrequentLongCalls: '#cddc39',
                FrequentEachLongCall: '#7b1fa2',
                ExpensiveCalls: '#ff5722',
                data6: '#009688' 
            },
            //This callback will be called when each data point clicked and will receive d and element as the arguments
            //d is the data clicked and element is the element clicked. In this callback, this will be the Chart object
            onclick: function (d, element) {
              $scope.event_name = d.name;
              $scope.$apply();
              console.log($scope.event_name);
            },
          },
          tooltip: {
            show: false
          },
          bar: {
            width: {
                ratio: 0.5 
              }
          },
          axis: {
            x: {
                show: false
            },
            y: {
                show: false
            }
          },
	      legend: {
	        show: false
	      }
        });
      },

      function ( err ) {
        console.log(err);   // log if an error occurs
      });

    // function that take you raw data into input and return a c3 compatible array
    function formatData ( json ) {
      var formattedData = [],
          object        = {};

      // fill object with data
      angular.forEach(json, function(row) {
        if (row.hasOwnProperty('DERIVED_EVENT_NAME') && row.hasOwnProperty('NO')) {
          this[row.DERIVED_EVENT_NAME] = row.NO;
        }
        //console.log(row.NO);
      },object);

      formattedData.push(object); // push c3 object in the array
      
      return formattedData;
    }

    /*for (var i = $scope.data.length; i >= 0; i++) {
      console.log(data[i]);
    };*/
}]);