 angular.module('ferariApp')
	.controller('PeriodController', ['$scope', 'socketio', '$http', '$interval', 
		function($scope, socketio, $http, $interval) {
            load_calls();
            /*$interval(function() {
                load_calls();
            },300);*/

			//total events			
			$scope.countToTotal = 4181;
    		$scope.countFrom = 0;

    		//today events
    		$scope.countToToday = 14;

    		//last 4 hours
    		$scope.countTo4hours = 6;

    		//last 24 hours
    		$scope.countTo24hours = 13;

    		//last 4 days
    		$scope.countTo4days = 26

            $scope.gridOptions = { 
                paginationPageSizes: [8, 20, 50],
                paginationPageSize: 8,
                enableFiltering: true, 
                enableRowHeaderSelection: false, 
                enableFullRowSelection: true,
                enableRowSelection: true 
            };

            $scope.gridOptions.columnDefs = [
                //{ name: 'CALL_ID', enableFiltering: true },
                { name: 'BILLED_MSISDN', enableFiltering: true },
                { name: 'CALL_START_DAT', enableFiltering: true },
                { name: 'CALL_SERVICE', enableFiltering: true },
                { name: 'PRICE_PLAN', enableFiltering: true },
                { name: 'CALLING_NUMBER', enableFiltering: true },
                { name: 'CALLED_NUMBER', enableFiltering: true },
                { name: 'OTHER_PARTY_TEL_NUMBER', enableFiltering: true },
                { name: 'CALL_DIRECTION', enableFiltering: true },
                { name: 'TAP_RELATED', enableFiltering: true },
                { name: 'CALL_CELL_ID', enableFiltering: true },
                { name: 'GEO_DESTINATION', enableFiltering: true },
                { name: 'DESTINATION_ZONE', enableFiltering: true },
                { name: 'CONVERSATION_DURATION', enableFiltering: true },
                { name: 'CHARGED_DURATION', enableFiltering: true },
                { name: 'CHARGED_UNITS', enableFiltering: true },
                //{ name: 'TOTAL_CALL_CHARG_AMOUNT', enableFiltering: true },
                //{ name: 'WCALL_COST', enableFiltering: true },
                //{ name: 'TOLL_COST', enableFiltering: true }
            ];

            $scope.last500 = [];

            //$scope.gridOptions.data = [];

            $scope.gridOptions.data = $scope.last500;

            function load_calls() {
                $http.get('http://localhost:3000/load').success(function (data) {
                    data.forEach( function( row, index ) {
                        $scope.last500.push(data);
                    });
                    $scope.gridOptions.data = data;
                    console.log('dohvaćeni podaci iz baze', data);
                })
            };

            /*socketio.on('result', function (data) {
                $scope.last500.push(data);
                console.log(data);
            });*/
	}]); 
	

