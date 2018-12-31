'use strict';

/**
 * @ngdoc function
 * @name ferariApp.controller:MostFrequentCallsCtrl
 * @description
 * # MostFrequentCallsCtrl
 * Controller of the ferariApp
 */
angular.module('ferariApp')
  .controller('MostFrequentCallsCtrl', ['$scope', '$http', 'uiGridConstants', 
    function ($scope, $http, uiGridConstants) {
    // get the calling_number
    //$scope.calling_number = $stateParams.calling_number;

    $scope.gridOptions = {
      paginationPageSizes: [8, 20, 50],
      paginationPageSize: 8,
      enableFiltering: true, 
      enableColumnResize : true,
      enableRowHeaderSelection: false, 
      enableFullRowSelection: true,
      enableRowSelection: true,
      enableHorizontalScrollbar: 1
    };

    $scope.gridOptions.columnDefs = [
      { name: 'called_number', enableFiltering: true },
      { name: 'no_occurence', enableFiltering: true },
    ];

    $scope.frequentCalls = [];

    $scope.gridOptions.data = $scope.frequentCalls;

    function mostFrequentCalls() {
        $http.get('/mostfrequent').success(function (data) {
            data.forEach( function( row, index ) {
                $scope.frequentCalls.push(data);
            });
            $scope.gridOptions.data = data;
            //console.log('dohvaćeni podaci iz baze', data);
        })
    };

    mostFrequentCalls();
}]);

