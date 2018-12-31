'use strict';

/**
 * @ngdoc function
 * @name ferariApp.controller:CustomerCtrl
 * @description
 * # CustomerCtrl
 * Controller of the ferariApp
 */
 
angular.module('ferariApp')
  .controller('CustomerCtrl', ['$scope', '$http', 'uiGridConstants', '$stateParams', 
    function ($scope, $http, uiGridConstants, $stateParams) {
    // get the id
    // $scope.id = $stateParams.eventID;  
    $scope.calling_number = $stateParams.calling_number;

    load_customers();

    $scope.gridOptions = { 
      paginationPageSizes: [8, 20, 50],
      //rowTemplate: rowTemplate(),
      enableFiltering: true, 
      enableColumnResize : true,
      enableRowHeaderSelection: false, 
      enableFullRowSelection: true,
      enableRowSelection: true,
      enableHorizontalScrollbar: 1,
      exporterOlderExcelCompatibility: true,
      enableGridMenu: true,
      enableSelectAll: true,
      exporterCsvFilename: 'SubscriberDetails.csv',
      exporterMenuCsv: true,
      exporterMenuPdf: false,
      exporterPdfDefaultStyle: {fontSize: 9},
      exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
      exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
      exporterPdfHeader: { text: "Subscriber Details", style: 'headerStyle' },
      exporterPdfFooter: function ( currentPage, pageCount ) {
        return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
      },
      exporterPdfCustomFormatter: function ( docDefinition ) {
        docDefinition.styles.headerStyle = { fontSize: 22, bold: true };
        docDefinition.styles.footerStyle = { fontSize: 10, bold: true };
        return docDefinition;
      },
      exporterPdfOrientation: 'portrait',
      exporterPdfPageSize: 'LETTER',
      exporterPdfMaxGridWidth: 500,
      exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
      exporterFieldCallback: function ( grid, row, col, value ) {
        if ( col.name === 'subscriber_activation_date' || col.name === 'subscriber_rate_plan' || col.name === 'rate_plan_change_date') {
          var parsedDate = new Date(value);
          return moment(parsedDate).format("YYYY-MM-DD HH:mm");
        }
        else {
          return value;
        }
      },
      onRegisterApi: function(gridApi){
        $scope.gridApi = gridApi;
      }
    };

    $scope.gridOptions.columnDefs = [
       // { name: 'calling_number', enableFiltering: true },
        { name: 'subscriber_name', enableFiltering: true },
        { name: 'subscriber_address', enableFiltering: true },
        { name: 'subscriber_activation_date', enableFiltering: true, cellFilter: 'date:"yyyy-MM-dd HH:mm"' },
        { name: 'subscriber_vat_code', enableFiltering: true },
        { name: 'subscriber_status', enableFiltering: true },
        { name: 'subscriber_rate_plan', enableFiltering: true, cellFilter: 'date:"yyyy-MM-dd HH:mm"' },
        { name: 'rate_plan_change_date', enableFiltering: true, cellFilter: 'date:"yyyy-MM-dd HH:mm"' },
        { name: 'payment_type', enableFiltering: true },
        { name: 'payment_behavior', enableFiltering: true },
        { name: 'credit_score', enableFiltering: true }
    ];

    $scope.customers = [];

    $scope.gridOptions.data = $scope.customers; 

    function load_customers() {
      $http.get('/subscriber/'+$stateParams.calling_number).success(function (data) {
        $scope.customers = data;
        $scope.gridOptions.data = [data];
        //console.log('dohvaćeni podaci iz baze', $scope.gridOptions.data);
      })
    };
}]);



