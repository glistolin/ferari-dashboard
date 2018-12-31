'use strict';

/**
 * @ngdoc function
 * @name ferariApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the ferariApp
 */

angular.module('ferariApp')
  .controller('LoginController', ['$rootScope', '$scope', '$state', '$http', '$stateParams', '$mdToast', 'AuthenticationService', 
    function($rootScope, $scope, $state, $http, $stateParams, $mdToast, AuthenticationService) {

    $scope.login = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call login from service
      AuthenticationService.login($scope.loginForm.username, $scope.loginForm.password)
        // handle success
        .then(function () {
          $rootScope.username = $scope.loginForm.username;
          $scope.disabled = false;
          $scope.loginForm = {};
          $state.go('home.dashboard');
          
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Invalid username and/or password";
          $scope.disabled = false;
          $scope.loginForm = {};
        });
    };

    $scope.register = function() {
      $state.go('/register');
    }

  }]);