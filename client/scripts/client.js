var pmdbApp = angular.module('pmdbApp', []);

pmdbApp.controller('InputController', ['$scope', 'MovieService', function($scope, MovieService) {
  console.log('InputController loaded');
  $scope.title = '';
  MovieService.searchOMDB($scope.title);
}]);

pmdbApp.controller('OutputController', ['$scope', 'MovieService', function($scope, MovieService) {
  console.log('OutputController loaded');
}]);

pmdbApp.factory('MovieService', ['$http', function($http) {
  return {
    searchOMDB: function(title) {
      $http.get('http://www.omdbapi.com/?t=Galaxy+Quest').then(function(response) {
        console.log(response);
      });
    }
  };
}]);
