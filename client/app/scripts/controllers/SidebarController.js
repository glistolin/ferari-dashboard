angular.module('ferariApp')
.controller('SidebarCtrl', function ($scope) {

    $scope.item = [
      {
        icon: 'list'
      }
    ];
    
})
.controller('TabCtrl', function($scope, $location, $log) {
        $scope.selectedIndex = 0;

        $scope.$watch('selectedIndex', function(current, old) {
            switch (current) {
                case 0:
                    $location.url("/view1");
                    break;
                case 1:
                    $location.url("/view2");
                    break;
                case 2:
                    $location.url("/view3");
                    break;
            }
        });
    });
