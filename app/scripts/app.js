'use strict';

var app = angular.module('hackathonApp', ['ngRoute']);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '../views/main.html',
      controller: 'MainCtrl'
    })
    .when('/slideshow', {
      templateUrl: '../views/slideshow.html',
      controller: 'SlideshowCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
});
