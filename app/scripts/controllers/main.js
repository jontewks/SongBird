'use strict';

var app = angular.module('hackathonApp');

app.controller('MainCtrl', function ($scope, $rootScope, $location) {
  $scope.search = function(input) {
    $rootScope.searchTag = input;
    $location.path('/slideshow');
  };
});

app.controller('SlideshowCtrl', function ($scope, $http, $rootScope) {
  $http.post('http://localhost:8080/', $rootScope.searchTag)
    .then(function() {
      console.log('sent');
    });
});
