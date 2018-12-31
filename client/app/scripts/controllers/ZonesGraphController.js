angular.module('ferariApp')
.controller('ZonesGraphCtrl', ['$scope', '$stateParams',
    function ($scope, $stateParams) {

    $scope.callingNumber = $stateParams.calling_number;

    // behavior - zones
    d3.json('/zones/'+$stateParams.calling_number, function(err, data){
        if(err){ throw err; }
        $scope.data = data;
        //console.log(data);
        //$scope.$apply();

        $scope.chart_zones = c3.generate({
            bindto: d3.select('#zones'),
            size: {
                height: 300,
                width: 640
            },
            data: {
                json: $scope.data,
                //columns: $scope.data,
                keys: {
                    value: ['units', 'duration'],
                },
                type: 'bar'

            },
            axis: {
                x: {
                    label: 'X Label'
                },
                y: {
                    label: 'Y Label'
                }
            },
            bar: {
                width: {
                    ratio: 0.4 // this makes bar width 50% of length between ticks
                }
            },
            grid: {
                x: {
                    show: true
                },
                y: {
                    show: true
                }
            },
            color: {
                pattern: ['#3F51B5', '#FF4081']
            }
        });
        /*setTimeout(function () {
            $scope.chart.resize({height:300, width:640})
        }, 1000);*/
        function adjustSize() {
            $scope.chart_zones.resize();       
        }
    });
}]);