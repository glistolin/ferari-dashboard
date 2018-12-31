angular.module('ferariApp')
.controller('FraudMsisdnGraphCtrl', ['$scope', '$stateParams',
    function ($scope, $stateParams) {

    $scope.callingNumber = $stateParams.calling_number;

    // behavior - peak / OffPeak
    d3.json('/fraudnumber/'+$stateParams.calling_number, function(err, data){
        if(err){ throw err; }
        $scope.data = data;
        //console.log(data);
        $scope.$apply();

        $scope.chart = c3.generate({
            bindto: '#fraud_msisdn',
            data: {
                json: $scope.data,
                //columns: $scope.data,
                keys: {
                    value: ['count'],
                },
                type: 'bar'

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
                pattern: [ '#3F51B5', '#FF4081']
            }
        });
    });
}]);