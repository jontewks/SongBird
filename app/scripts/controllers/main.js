'use strict';

var app = angular.module('hackathonApp');

app.controller('MainCtrl', function ($scope, $rootScope, $location) {
  $scope.search = function(input) {
    $rootScope.searchTag = input;
    $location.path('/slideshow');
  };
});

app.controller('SlideshowCtrl', function ($scope, $http, $rootScope, $interval) {
  $scope.getPics = function() {
    $http.post('/api', $rootScope.searchTag)
      .then(function (res) {
        $scope.pics = res.data;
      });
  };

  $scope.getPics();
});
