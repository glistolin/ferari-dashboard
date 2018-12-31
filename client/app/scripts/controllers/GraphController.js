'use strict'

angular.module('ferariApp')
.controller('GraphCtrl', ['$mdDialog', function ($scope, $mdDialog) {

    // last 6 hours events chart
    $scope.chart_grid_lines = c3.generate({
        bindto: '#mini_4hours',
        size: {
            height: 88
        },
        data: {
            columns: [
                ['data1', 5, 2, 10],
                ['data2', 13, 7, 6],
                ['data3', 18, 2, 8],
                ['data4', 13, 10, 11],
                ['data5', 4, 12, 14],
                ['data6', 16, 4, 12]
            ],
            type: 'bar',
            colors: {
                data1: '#3F51B5',
                data2: '#FF4081',
                data3: '#cddc39',
                data4: '#7b1fa2',
                data5: '#ff5722',
                data6: '#009688' 
            },
            onclick: function(e) { 
                alert(e.value);
            }
        },
        tooltip: {
                show: false
        },
        bar: {
            width: {
                ratio: 0.5 // this makes bar width 50% of length between ticks
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
    
    $scope.daily_analysis = c3.generate({
        bindto: d3.select('#daily_analysis'),
        size: {
            height: 300
        },
        data: {
            columns: [
                ['data1', 300, 350, 300, 0, 0, 0],
                ['data2', 130, 100, 140, 200, 150, 50]
            ],
            types: {
                data1: 'area',
                data2: 'area-spline'
            },
             colors: {
                data1: '#3F51B5',
                data2: '#FF4081'
            }
        }
    });
}]);