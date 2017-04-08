var pmdbApp = angular.module('pmdbApp', []);

pmdbApp.controller('InputController', ['$scope', 'MovieService', function($scope, MovieService) {
  console.log('InputController loaded');
  $scope.title = '';
  $scope.searchOMDB = MovieService.searchOMDB;
  $scope.searchResults = MovieService.searchResults;
}]);

pmdbApp.controller('OutputController', ['$scope', 'MovieService', function($scope, MovieService) {
  console.log('OutputController loaded');
}]);

pmdbApp.factory('MovieService', ['$http', function($http) {
  // IS THIS THE RIGHT WAY TO GO ABOUT THIS?
  var searchResults = {};
  return {
    // DO WE WANT THE SEARCH RESULTS TO HAVE A REFERENCE STORED TO THE RETURN OBJ?
    searchResults: searchResults, // pass an object referece
    searchOMDB: function(title) {
      $http.get('http://www.omdbapi.com/?t=' + title).then(function(response) {
        console.log(response);
        searchResults.response = response; // store search response as an object property
      });
    }
  };
}]);
