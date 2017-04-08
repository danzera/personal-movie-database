var pmdbApp = angular.module('pmdbApp', []);

pmdbApp.controller('InputController', ['$scope', 'MovieService', function($scope, MovieService) {
  console.log('InputController loaded');
  $scope.title = ''; // data-bound to user input field
  $scope.searchOMDB = MovieService.searchOMDB; // data-bound to user button click
  // reference to searchResults object
  // object contains the OMDB response as a property
  $scope.searchResults = MovieService.searchResults;
  $scope.getPoster = MovieService.getPoster; // data-bound to
}]); // end 'InputController'

pmdbApp.controller('OutputController', ['$scope', 'MovieService', function($scope, MovieService) {
  console.log('OutputController loaded');
}]); // end 'OutputController'

pmdbApp.factory('MovieService', ['$http', function($http) {
  // searchResults object will be used to store response from the OMDB API
  var searchResults = {};

  // public information
  return {
    // DO WE WANT THE SEARCH RESULTS TO HAVE A REFERENCE STORED TO THE RETURN OBJ?
    searchResults: searchResults, // pass an object referece
    searchOMDB: function(title) {
      $http.get('http://www.omdbapi.com/?t=' + title).then(function(response) {
        console.log(response);
        if (response.data.Error) { // alert user if no movie matches search results
          alert('Movie not found!');
        } else { // otherwise store response as an object property
          searchResults.response = response;
        }
      }); // end $http.get
    } // end searchOMDB()
  }; // end return
}]); // end 'MovieService'
