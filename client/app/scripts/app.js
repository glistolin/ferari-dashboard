'use strict';

/**
 * @ngdoc overview
 * @name appApp
 * @description
 * # appApp
 *
 * Main module of the application.
 */
angular
  .module('ferariApp', [
  	'countTo',
    'ngMaterial',
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngResource',
    'ngTouch',
    'ui-leaflet',
    'ui.router',
    'ngMdIcons',
    'ui.grid', 
    'ui.grid.edit',
    'ui.grid.rowEdit',
    'ui.grid.selection',
    'ui.grid.cellNav',
    'ui.grid.pagination',
    'ui.grid.resizeColumns',
    'ui.grid.exporter',
    'angularMoment',
    'angular-clipboard',
    angularDragula(angular)
  ])
  .config( function ($stateProvider, $urlRouterProvider, $locationProvider, $mdGestureProvider){
    $stateProvider
     .state('login', {
        url: '/login',
        //abstract: true,
        templateUrl: 'views/login.html',
        controller: 'LoginController'
      })
     .state('register', {
        url: '/register',
        templateUrl: 'views/register.html',
        access: {restricted: true}
      })
      .state('home', {
        url:'',
        templateUrl: 'views/home.html',
        controller: 'MainController',
        access: {restricted: true}
      })
      .state('home.dashboard', {
        url: '/dashboard',
        templateUrl: 'views/dashboard.html',
        access: {restricted: true}
      })
      .state('home.graphs', {
        url: '/graphs',
        templateUrl: 'views/partials/graphs.html',
        access: {restricted: true}
      })
      .state('home.table', {
        url: '/table',
        templateUrl: 'views/partials/widgets/table-widget.html',
        access: {restricted: true}
      })
      .state('home.map', {
        url: '/map',
        templateUrl: 'views/partials/widgets/map-widget.html',
        access: {restricted: true}
      })
      .state('detail', {
        url: 'detail/:_id/:calling_number/:Name',
        templateUrl: 'views/detail.html',
        access: {restricted: true}
      });

    // For any unmatched url, send to /
    $urlRouterProvider.otherwise('/login');
    $mdGestureProvider.skipClickHijack();
    //remove the hashtag from URL
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  })
  .run(function ($rootScope, $state, AuthenticationService) {
    $rootScope.$on('$stateChangeStart', function () {
      if(!AuthenticationService.isLoggedIn()){
        $state.go("login", {}, {notify:false});
      }
    })
  });
