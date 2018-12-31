angular.module('ferariApp')
.controller('PeakGraphCtrl', ['$http', '$scope', '$interval',
    function ($http, $scope, $interval) {

    // behavior - peak / OffPeak

    $scope.chart_peak = c3.generate({
        bindto: d3.select('#peak'),
        data: {
            url: '/peak',
            mimeType: 'json',
            //columns: $scope.data,
            keys: {
                value: ['no_calls_peek', 'no_calls_offpeek'],
            },
            names: {
                no_calls_peek: 'No Peek Calls',
                no_calls_offpeek: 'No Offpeek Calls',
            },
            type: 'bar'
        },
        axis: {
            x: {
                type: 'category',
                categories: ['FrequentLongCallsAtNight', 'LongCallAtNight', 'FrequentLongCalls', 'FrequentEachLongCall', 'ExpensiveCalls']
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
            pattern: [ '#3F51B5', '#FF4081']
        }
    });

    function adjustSize() {
        $scope.chart_peak.resize();       
    }

}]);