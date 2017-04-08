var pmdbApp = angular.module('pmdbApp', []);

pmdbApp.controller('InputController', ['$scope', 'MovieService', function($scope, MovieService) {
  console.log('InputController loaded');
  $scope.hello = MovieService.hello;
}]);

pmdbApp.controller('OutputController', ['$scope', 'MovieService', function($scope, MovieService) {
  console.log('OutputController loaded');
  $scope.hello = MovieService.hello;
}]);

pmdbApp.factory('MovieService', ['$http', function($http) {
  return {
    hello: 'hello from the factory'
  };
}]);
