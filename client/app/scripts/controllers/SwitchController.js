angular.module('ferariApp')
	.controller('SwitchCtrl', function($scope) {

		$scope.data = {
			data1: true,
			data2: true
		};

		$scope.chart_grid_lines = c3.generate({
            bindto: d3.select('#chart1'),
            size: {
                height: 300,
                width: 300
            },
            data: {
                columns: [
                    ['data1', 30,200,100,400,150,250],
                    ['data2', 50,20,10,40,15,25]
                ],
                type: 'spline',
                colors: {
                    data1: '#3F51B5',
                    data2: '#FF4081'
                }
            },
            legend: {
                show: false
            },
            oninit: function () {
                this.main.append('rect')
                    .style('fill', 'white')
                    .attr('x', 0.5)
                    .attr('y', -0.5)
                    .attr('width', this.width)
                    .attr('height', this.height)
                  .transition().duration(1000)
                    .attr('x', this.width)
                    .attr('width', 0)
                  .remove();
            }
        });

		//update switch
    /*$scope.$watch('data', function() {
        if ($scope.data.data1)
            $scope.chart_grid_lines.show(['data1']);
        else
            $scope.chart_grid_lines.hide(['data1']);
        if ($scope.data.data2)
            $scope.chart_grid_lines.show(['data2']);
        else
            $scope.chart_grid_lines.hide(['data2']);
    }, true);*/

    $scope.updateChart = function() {
        if ($scope.data.data1)
            $scope.chart_grid_lines.show(['data1']);
        else
            $scope.chart_grid_lines.hide(['data1']);
        if ($scope.data.data2)
            $scope.chart_grid_lines.show(['data2']);
        else
            $scope.chart_grid_lines.hide(['data2']);
    }
    
	})