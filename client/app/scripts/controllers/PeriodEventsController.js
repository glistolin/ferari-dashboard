'use strict'

angular.module('ferariApp')
.controller('PeriodEventsCtrl', ['$rootScope', '$scope', '$interval', '$http', 'socketio', function ($rootScope, $scope, $interval, $http, socketio) {
	$scope.showBoxOne = false;
  $scope.showBoxTwo = false;

  $scope.event_name = '';

  $scope.onehour = [];  // format received data

    //$scope.onehour = formatData(json.data)

    $scope.mini_onehour = c3.generate({
      bindto: d3.select('#mini_onehour'),
      size: {
        height: 88 
      },
      data: {
        json: $scope.onehour,
        keys: {
          value: ['FrequentLongCallsAtNight', 'LongCallAtNight', 'FrequentLongCalls', 'FrequentEachLongCall', 'ExpensiveCalls']
        },
        type: 'bar',
        selection: {
          enabled: true,
          multiple: true,
        }, 
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
          //console.log($scope.event_name);
        },
      },
      tooltip: {
        grouped: false,
        format: {
          title: function () { return 'In one hour' }
        }
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
        //bindto: d3.select("#mini-footer")
        show: false
      }
  });
  
  $scope.myData = [];
  $scope.fraudData = [];
  $scope.onehourConcatenated = [];  

  $scope.getDataFromSocket = function() {
    socketio.on('lasthour', function (json) {
      console.log(json);
      var json = JSON.parse(json);

      json.forEach(function (a) {
        for (var key in a ) {
          if (a[key] != null && key == "Name") {
            var ca = true;
            var obj = { Name: a[key], NO: 1 };
            for (var i = 0; i < $scope.myData.length; i++) {
              if ($scope.myData[i].Name == a[key]) {
                $scope.myData[i].NO++;
                ca = false;
              }
              else {
                ca = true; 
              }
            }
            if(ca) {
              $scope.myData.unshift(obj);
              $scope.onehourConcatenated = $scope.myData.concat($scope.fraudData);
              //$scope.mini_onehour.load({json: $scope.onehourConcatenated, keys: { value: ['FrequentLongCallsAtNight', 'LongCallAtNight', 'FrequentLongCalls', 'FrequentEachLongCall', 'ExpensiveCalls'] }});
              $scope.onehour = formatData($scope.onehourConcatenated);
              //console.log(grouped);
            }
          }
        }
      });
      $scope.mini_onehour.load({json: $scope.onehour, keys: { value: ['FrequentLongCallsAtNight', 'LongCallAtNight', 'FrequentLongCalls', 'FrequentEachLongCall', 'ExpensiveCalls'] }});
    });
  };

  $scope.getDataFromAPI = function() {
    $http({
      url: '/onehour', 
      method: "GET",
    })
    .then(function(json) {
      $scope.onehour = formatData(json.data);
      $scope.mini_onehour.load({json: $scope.onehour, keys: { value: ['FrequentLongCallsAtNight', 'LongCallAtNight', 'FrequentLongCalls', 'FrequentEachLongCall', 'ExpensiveCalls'] }});
      $scope.getDataFromSocket();
    });
  };

  $scope.getDataFromAPI();
  /*$http({
    url: '/onehour', 
    method: "GET",
  })
  .then(function(json) {
    $scope.onehour = formatData(json.data);
    $scope.mini_onehour.load({json: $scope.onehour, keys: { value: ['FrequentLongCallsAtNight', 'LongCallAtNight', 'FrequentLongCalls', 'FrequentEachLongCall', 'ExpensiveCalls'] }});
  });*/

  $scope.sixhours = formatData({});
  
  // generate chart
  $scope.mini_sixhours = c3.generate({
    bindto: d3.select('#mini_sixhours'),
    size: {
      height: 88 
    },
    data: {
      json: $scope.sixhours,
      keys: {
        value: ['FrequentLongCallsAtNight', 'LongCallAtNight', 'FrequentLongCalls', 'FrequentEachLongCall', 'ExpensiveCalls'],
      },
      type: 'bar',
      selection: {
        enabled: true,
        multiple: true,
      }, 
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
        //console.log($scope.event_name);
      },
    },
    tooltip: {
      grouped: false,
      format: {
        title: function () { return 'The last six hours'}
      }
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
  
  $http({
    url: '/sixhours', 
    method: "GET",
  }).then(function(json) {
      $scope.sixhours = formatData(json.data)
      $scope.mini_sixhours.load({json: $scope.sixhours, keys: { value: ['FrequentLongCallsAtNight', 'LongCallAtNight', 'FrequentLongCalls', 'FrequentEachLongCall', 'ExpensiveCalls'] }});
  });


  $scope.oneday = formatData({});

  // generate 24 hours chart
  $scope.mini_oneday = c3.generate({
    bindto: d3.select('#mini_oneday'),
    size: {
      height: 88 
    },
    data: {
      json: $scope.oneday,
      keys: {
        value: ['FrequentLongCallsAtNight', 'LongCallAtNight', 'FrequentLongCalls', 'FrequentEachLongCall', 'ExpensiveCalls'],
      },
      type: 'bar',
      selection: {
        enabled: true,
        multiple: true,
      }, 
      colors: {
          FrequentLongCallsAtNight: '#3F51B5',
          LongCallAtNight: '#FF4081',
          FrequentLongCalls: '#cddc39',
          FrequentEachLongCall: '#7b1fa2',
          ExpensiveCalls: '#ff5722',
          data6: '#009688' 
      },
      onclick: function (d, element) {
        $scope.event_name = d.name;
        $scope.$apply();
        //console.log($scope.event_name);
      },
    },
    tooltip: {
      grouped: false,
      format: {
        title: function () { return 'The last 24 hours' }
      }
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

  $http({
    url: '/24hours', 
    method: "GET",
  }).then(function(json) {
      $scope.oneday = formatData(json.data)
      $scope.mini_oneday.load({json: $scope.oneday, keys: { value: ['FrequentLongCallsAtNight', 'LongCallAtNight', 'FrequentLongCalls', 'FrequentEachLongCall', 'ExpensiveCalls'] }});
  });



  // function that take raw data into input and return a c3 compatible array
  function formatData ( json ) {
    var formattedData = [],
        object        = {};

    // fill object with data
    angular.forEach(json, function(row) {
      if (row.hasOwnProperty('Name') && row.hasOwnProperty('NO')) {
        this[row.Name] = row.NO;
      }
    },object);

    formattedData.push(object); // push c3 object in the array

    return formattedData;
    console.log(object);
  }
  
}]);