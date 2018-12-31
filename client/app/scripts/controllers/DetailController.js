'use strict';

/**
 * @ngdoc function
 * @name ferariApp.controller:DetailCtrl
 * @description
 * # DetailCtrl
 * Controller of the ferariApp
 */
 
angular.module('ferariApp')
  .controller('DetailController', ['$scope', '$http', 'uiGridConstants', '$stateParams', '$mdDialog', 
    function ($scope, $http, uiGridConstants, $stateParams, $mdDialog) {
    // get the id
    // $scope.id = $stateParams.eventID;  
    $scope.callingNumber = $stateParams.calling_number;

    load_calls();

    $scope.gridOptions = { 
      paginationPageSizes: [8, 20, 50],
      paginationPageSize: 8,
      enableFiltering: true, 
      enableRowHeaderSelection: false, 
      enableFullRowSelection: true,
      enableRowSelection: true
    };

    $scope.gridOptions.columnDefs = [
        //{ name: 'call_id', enableFiltering: true },
        { name: 'billed_msisdn', enableFiltering: true },
        { name: 'call_start_dat', enableFiltering: true, cellFilter: 'date:"yyyy-MM-dd HH:mm"' },
        { name: 'call_service', enableFiltering: true },
        { name: 'price_plan', enableFiltering: true },
        { name: 'calling_number', enableFiltering: true },
        { name: 'called_number', enableFiltering: true },
        { name: 'other_party_tel_number', enableFiltering: true },
        { name: 'call_direction', enableFiltering: true },
        { name: 'tap_related', enableFiltering: true },
        { name: 'call_cell_id', enableFiltering: true },
        { name: 'geo_destination', enableFiltering: true },
        { name: 'destination_zone', enableFiltering: true },
        { name: 'conversation_duration', enableFiltering: true },
        { name: 'charged_duration', enableFiltering: true },
        //{ name: 'charged_units', enableFiltering: true },
        //{ name: 'total_call_charg_amount', enableFiltering: true },
        //{ name: 'wcall_cost', enableFiltering: true },
        //{ name: 'toll_cost', enableFiltering: true }
    ];

    $scope.last500 = [];

    $scope.gridOptions.data = $scope.last500; 

    function load_calls() {
    //$scope.callingNumber = $stateParams.calling_number;
        $http.get('/load/'+$stateParams.calling_number).success(function (data) {
            data.forEach( function( row, index ) {
                $scope.last500.push(data);
            });
            $scope.gridOptions.data = data;
            console.log('dohvaćeni podaci iz baze', data);
            if(!$scope.$$phase) { $scope.$apply()}
        })
    };
}]);



