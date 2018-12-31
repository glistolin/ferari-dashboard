'use strict';

/**
 * @ngdoc function
 * @name ferariApp.controller:SignUpController
 * @description
 * # SignUpController
 * Controller of the ferariApp
 */

angular.module('ferariApp')
  .controller('SignUpController', ['$scope', '$rootScope', '$state', '$location', 'AuthenticationService', 
    function($scope, $rootScope, $state, $location, AuthenticationService) {

    $scope.register = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call register from service
      AuthenticationService.register($scope.registerForm.username, $scope.registerForm.password, $scope.registerForm.password2, $scope.registerForm.email)
        // handle success
        .then(function () {
          $rootScope.email = $scope.registerForm.email;
          $location.path('/login');
          $scope.disabled = false;
          $scope.registerForm = {};
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Something went wrong!";
          $scope.disabled = false;
          $scope.registerForm = {};
        });

    };

    $scope.login = function() {
      $state.go('/login')
    }
  }]);