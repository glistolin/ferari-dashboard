'use strict';

/**
 * @ngdoc function
 * @name ferariApp.controller:DetailCtrl
 * @description
 * # DetailCtrl
 * Controller of the ferariApp
 */

angular.module('ferariApp')
  .controller('DetailCtrlAllCalls', ['$scope', '$filter', '$http', 'uiGridConstants', 'uiGridExporterService', '$stateParams', 'clipboard',
    function ($scope, $filter, $http, uiGridConstants, uiGridExporterService, $stateParams, clipboard) {
    
    // get the calling_number
    $scope.calling_number = $stateParams.calling_number;
    $scope.Name = $stateParams.Name;

    if ($scope.Name === "LongCallAtNight") {
      loadLongCallAtNight();
    }
    else {
      loadAllCalls();
    }

    $scope.gridOptions = { 
      paginationPageSizes: [8, 20, 50],
      paginationPageSize: 8,
      enableFiltering: true, 
      enableColumnResize : true,
      enableRowHeaderSelection: false, 
      enableFullRowSelection: true,
      enableRowSelection: true,
      enableHorizontalScrollbar: 1,
      exporterOlderExcelCompatibility: true,
      enableGridMenu: true,
      enableSelectAll: true,
      exporterCsvFilename: 'DerivedEventDetails.csv',
      exporterMenuCsv: true,
      exporterMenuPdf: false,
      exporterPdfDefaultStyle: {fontSize: 9},
      exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
      exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
      exporterPdfHeader: { text: "Derived Details Events", style: 'headerStyle' },
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
        if ( col.name === 'call_start_date' || col.name === 'call_start_dates' ) {
          var parsedDate = new Date(parseFloat(value));
          return moment(parsedDate).format("YYYY-MM-DD HH:mm");
        }
        else {
          return value;
        }
      },
      onRegisterApi: function(gridApi){
        $scope.gridApi = gridApi;
        gridApi.selection.on.rowSelectionChanged($scope, function (row) {
            var msg = 'row selected ' + row.isSelected;
            
            $scope.supported = false;

            $scope.rowValues = row.entity;

            $scope.newData = angular.copy($scope.rowValues);
            $scope.textToCopy = JSON.stringify($scope.newData);
            
            clipboard.copyText($scope.textToCopy);
            $scope.success = function () {
                console.log('Copied!');
            };

            $scope.fail = function (err) {
                console.error('Error!', err);
            };
            console.log($scope.textToCopy);
        });
      }
    };

    $scope.allCalls = [];

    $scope.gridOptions.data = $scope.allCalls;

    function loadLongCallAtNight() {
      $http.get('/longcallatnight/'+$stateParams.calling_number).success(function (data) {
        $scope.gridOptions.columnDefs = [
            { name: 'call_start_date', cellFilter: 'date:"yyyy-MM-dd HH:mm"'},
            { name: 'calling_number' },
            { name: 'called_number' },
            { name: 'other_party_tel_number' },
            { name: 'conversation_duration' }    
          ];
          $scope.allCalls = data;
          $scope.gridOptions.data = [data];
        //console.log('dohvaćeni podaci iz baze', data);
      })
    };

    function loadAllCalls() {
      $http.get('/derived/'+$stateParams._id).success(function (data) {
        $scope.gridOptions.columnDefs = [
          { name: 'call_start_dates', cellFilter: 'date:"yyyy-MM-dd HH:mm"' },
          { name: 'calling_number' },
          { name: 'called_numbers' },
          { name: 'other_party_tel_numbers' },
          { name: 'conversation_durations' }    
        ];

        data.forEach( function( row, index ) {
          row.calling_number = $scope.calling_number;
          row.Name = $scope.Name;
          $scope.allCalls.push(row);
        });
      });
    };
}]);