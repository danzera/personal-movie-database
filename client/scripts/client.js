var pmdbApp = angular.module('pmdbApp', []);

pmdbApp.controller('InputController', ['$scope', 'MovieService', function($scope, MovieService) {
  console.log('InputController loaded');
  $scope.title = ''; // data-bound to user input field
  // $scope.searchForm = MovieService.searchForm;
  $scope.searchOMDB = MovieService.searchOMDB; // data-bound to user button click
  // reference to searchResults object
  // object contains the OMDB response as a property
  $scope.searchResults = MovieService.searchResults;
  $scope.getPoster = MovieService.getPoster; // bound to 'Search OMDB' button
  $scope.addToFavorites = MovieService.addToFavorites; // bound to 'Add to Favorites' button
}]); // end 'InputController'

pmdbApp.controller('OutputController', ['$scope', 'MovieService', function($scope, MovieService) {
  console.log('OutputController loaded');
  $scope.movieService = MovieService;
  $scope.movies = MovieService.movies;
  $scope.getFavorites = MovieService.getFavorites;
  $scope.getFavorites();
}]); // end 'OutputController'

pmdbApp.factory('MovieService', ['$http', function($http) {
  // searchResults object will be used to store response from the OMDB API
  var searchResults = {};
  var movies = {}; // used to store all favorites from DB

  // get all favorites from DB
  var getFavorites = function() {
    $http.get('/movies').then(function(response) {
      console.log(response.data);
      movies.favorites = response.data;
      console.log('favorite movies array:', movies.favorites);
    }); // end $http.get
  }; // end getFavorites()

  function isNewMovie(movie) {
    for (var i = 0; i < movies.favorites.length; i++) {
      if (movie.imdbID === movies.favorites[i].imdbID) {
        return false;
      }
    }
    return true;
  }

  // var saveToDatabase = function(movie) {
  //   console.log('got here with movie', movie);
  //   $http.post('/movies', movie).then(function(response) {
  //     console.log('response');
  //   });
  // }

  // public information
  return {
    movies: movies,
    searchResults: searchResults, // pass an object referece
    getFavorites: getFavorites,
    // searchForm: searchForm,
    searchOMDB: function(title) {
      $http.get('http://www.omdbapi.com/?t=' + title).then(function(response) {
        console.log(response);
        if (response.data.Error) { // alert user if no movie matches search results
          alert('Movie not found!');
        } else { // otherwise store response as an object property
          searchResults.response = response;
        }
      }); // end $http.get
    }, // end searchOMDB()
    addToFavorites: function(movie) {
      var newMovie = isNewMovie(movie); // verify if movie has already been favorited
      if (newMovie) { // add to favorite movies if it's a new movie
        console.log(movie);
        movies.favorites.push(movie);
        $http.post('/movies', movie).then(function(response) {
          console.log('saved movie to database:', response);
        });
        // .then(function(response) {
        //   console.log(response);
        // }).catch(function(err) {
        //   console.log('error:', err);
        // });
      } else { // alert user if it's already been favorited
        alert('This movie is already in your list of favorites.');
      }
    } // end addToFavorites()
  }; // end return
}]); // end 'MovieService'
