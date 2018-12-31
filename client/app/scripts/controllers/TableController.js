 angular.module('ferariApp')
	.controller('TableController', ['$scope', '$state', '$http', 'uiGridConstants', 'socketio', '$mdDialog', '$stateParams', 'clipboard',
		function ($scope, $state, $http, uiGridConstants, socketio, $mdDialog, $stateParams, clipboard) {

		$scope._id = $stateParams._id;
		$scope.calling_number = $stateParams.calling_number;
		$scope.Name = $stateParams.Name; 

		$scope.gridOptions = { 
			paginationPageSizes: [8, 20, 50],
		    paginationPageSize: 8,
			rowTemplate: rowTemplate(),
			enableFiltering: true, 
			enableColumnResize : true,
			enableRowHeaderSelection: false, 
			enableFullRowSelection: true,
			enableRowSelection: true,
			enableHorizontalScrollbar: 1,
			exporterOlderExcelCompatibility: true,
			enableGridMenu: true,
		    enableSelectAll: true,
		    exporterCsvFilename: 'Derived_events.csv',
		    exporterMenuCsv: true,
    		exporterMenuPdf: false,
		    exporterPdfDefaultStyle: {fontSize: 9},
		    exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
		    exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
		    exporterPdfHeader: { text: "Derived Events", style: 'headerStyle' },
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
		        if ( col.name == 'OccurrenceTime' ) {
		          	var parsedDate = new Date(parseFloat(value));
		          	return moment(value).format("YYYY-MM-DD HH:mm");
			    }
		        else {
		          return value;
		        }
		    },
		    onRegisterApi: function(gridApi) {
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
			 	});
		    }
		};

		//Function for adding template on a single row (call of the showAdvanced function for open dialog)
		function rowTemplate() {
			return '<div ng-dblclick="grid.appScope.showAdvanced($event, row)">' +
		        '  <div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }"  ui-grid-cell>'+
		         ' </div> ' +
		       '</div>';
		}

		$scope.gridOptions.columnDefs = [
			{ name: 'Name', enableFiltering: true, width: 205, filter: { term: null } },
			//{ name: 'call_start_date', enableFiltering: true, width: 130, cellTemplate: '<div class="ui-grid-cell-contents"> {{row.entity.call_start_date | date:"yyyy-MM-dd HH:mm" }} {{row.entity.call_start_dates[0] | date:"yyyy-MM-dd HH:mm"}} </div>' },
			{ name: 'calling_number', enableFiltering: true, width: 135 },
			//{ name: 'called_number', enableFiltering: true, width: 130, cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.called_number}} {{row.entity.called_numbers[0]}}</div>' },
			{ name: 'conversation_duration', enableFiltering: true, width: 185, cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.conversation_duration}} {{row.entity.conversation_durations[0]}}</div>' },
			{ name: 'Duration', enableFiltering: true, width: 90 },
			{ name: 'OccurrenceTime', enableFiltering: true, width: 140, cellFilter: 'date:"yyyy-MM-dd HH:mm"'},
			{ name: 'call_direction', enableFiltering: true, width: 120 },
			//{ name: 'expiration_time', enableFiltering: true, width: 135 },
			{ name: 'Cost', enableFiltering: true, width: 60 },
			{ name: 'other_party_tel_number', enableFiltering: true, width: 195, cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.other_party_tel_number}} {{row.entity.other_party_tel_numbers[0]}}</div>' },
			{ name: 'Certainty', enableFiltering: true, width: 90 },
			{ name: 'total_call_charge_amount', enableFiltering: true, width: 205 },
			{ name: 'CallsCount', enableFiltering: true, width: 110 },
			{ name: 'CallsLengthSum', enableFiltering: true, width: 150 },
			{ name: 'call_start_time', enableFiltering: true, width: 130 },
			{ name: 'billed_msdn', enableFiltering: true, width: 150 }
		];

		$scope.myData = 
		[
		/*	JSON.parse("{\"OccurrenceTime\":1446034604230,\"call_start_date\":1399003543000,\"calling_number\":\"385984MBSNE\",\"call_direction\":\"O\",\"Certainty\":1,\"conversation_duration\":59,\"DetectionTime\":1446034604230,\"Duration\":0,\"other_party_tel_number\":\"00960983ELZFS\",\"called_number\":\"00385983ELZFS\",\"Cost\":0.0,\"Name\":\"LongCallAtNight\"}"),
			JSON.parse("{\"OccurrenceTime\":1446034604230,\"call_start_date\":1399003543000,\"calling_number\":\"385984MBSNE\",\"call_direction\":\"O\",\"Certainty\":1,\"conversation_duration\":59,\"DetectionTime\":1446034604230,\"Duration\":0,\"other_party_tel_number\":\"00960983ELZFS\",\"called_number\":\"00385983ELZFS\",\"Cost\":0.0,\"Name\":\"LongCallAtNight\"}"),
			JSON.parse("{\"OccurrenceTime\":1446034604230,\"call_start_date\":1399003543000,\"calling_number\":\"3859920YCLMH\",\"call_direction\":\"O\",\"Certainty\":1,\"conversation_duration\":59,\"DetectionTime\":1446034604230,\"Duration\":0,\"other_party_tel_number\":\"00960983ELZFS\",\"called_number\":\"00385983ELZFS\",\"Cost\":0.0,\"Name\":\"LongCallAtNight\"}")*/
		];

		$scope.fraudData = [];
		$scope.myConcatenatedData = [];

		//Populating ui grid table with data from socket
		$scope.getDataFromSocket = function() {
			socketio.on('message', function (msg) {
				$scope.myData.unshift(JSON.parse(msg));
	            $scope.myConcatenatedData = $scope.myData.concat($scope.fraudData);
				$scope.gridOptions.data = $scope.myConcatenatedData;
				//console.log('event from socket');
			});	
		};

	   	//Populating ui grid table with data from events collection
	   	$scope.dataLoaded = false;
	   	$scope.getDataFromDB = function() {
	        $http.get('/events').success(function (data) {
	        	$scope.dataLoaded = true;
	            data.forEach( function( row, index ) {
	                $scope.myData.push(row);
	            });
	            $scope.gridOptions.data = data;
	            //console.log('dohvaćeni podaci iz kolekcije', data);
	            $scope.getDataFromSocket();
			});
        };
        
        //$scope.getDataFromSocket();
		$scope.getDataFromDB();

		$scope.$watch('event_name', function () {
		    console.log('Name ' + $scope.event_name);
		    $scope.gridOptions.columnDefs[0].filter.term = $scope.event_name;
		    $scope.gridApi.core.notifyDataChange( uiGridConstants.dataChange.COLUMN );
		});

 		/* Function for open/close dialog and pass params */
 		$scope.showAdvanced = function(ev, row) {
 		    $mdDialog.show({
				clickOutsideToClose:true,
				templateUrl: 'views/detail.html',
				parent: angular.element(document.querySelector('#popupContainer')),
				targetEvent: ev,
				resolve: {
					selectedRow: function () {                    
					  return [row.entity._id, row.entity.calling_number, row.entity.Name ];
					},
				},
				controller: function ($scope, $mdDialog, selectedRow) {
					$scope.selectedRow = selectedRow;
					$stateParams._id = $scope.selectedRow[0];
					$stateParams.calling_number = $scope.selectedRow[1];
					$stateParams.Name = $scope.selectedRow[2];
					//console.log($stateParams._id);
					//console.log($stateParams.call_start_date);
					//$stateParams.derived_event_name = $scope.selectedRow;
					$scope.hide = function () {
				    	$mdDialog.hide();
				 	};
					$scope.cancel = function () {
				    	$mdDialog.cancel();
					};
				}
		    })
		};
	}])

	.directive('myCustomDropdown', function() {
		return {
			template: '<select class="form-control" ng-model="colFilter.term" ng-options="option.id as option.value for option in colFilter.options"></select>'
		};
	});
	