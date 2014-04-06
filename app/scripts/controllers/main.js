'use strict';

var app = angular.module('hackathonApp');

app.controller('MainCtrl', function ($scope, $rootScope, $location) {
  $scope.search = function(input) {
    $rootScope.searchTag = input;
    $location.path('/slideshow');
  };
});

app.controller('SlideshowCtrl', function ($scope, $http, $rootScope) {
  console.log(process.env);
  $http.post('http://songbird.azurewebsites.net/', $rootScope.searchTag)
    .then(function(res) {
      $scope.pics = res.data;
    })
});
