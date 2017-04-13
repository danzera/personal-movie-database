var pmdbApp = angular.module('pmdbApp', []);

pmdbApp.controller('InputController', ['$scope', 'MovieService', function($scope, MovieService) {
  console.log('InputController loaded');
  var search = this; // store reference to the controller as 'search'
  search.title = ''; // data-bound to user input field
  search.searchOMDBByTitle = MovieService.searchOMDBByTitle; // data-bound to user button click
  search.searchResults = MovieService.searchResults; // reference to searchResults object -- object contains responseFromOMDB as a property
  search.addToFavorites = MovieService.addToFavorites; // bound to 'Add to Favorites' button
}]); // end 'InputController'

pmdbApp.controller('OutputController', ['MovieService', function(MovieService) {
  console.log('OutputController loaded');
  var movies = this; // store reference to the controller as 'movies'
  MovieService.getFavoritesFromDatabase(); // call to the database to get all favorites when the controller is loaded
  movies.favorites = MovieService.favorites; // reference to the factory's favorites object, which has an array of movies as a property
  movies.deleteFromFavorites = MovieService.deleteFromFavorites;
}]); // end 'OutputController'

pmdbApp.factory('MovieService', ['$http', function($http) {
  var searchResults = { // searchResults object will be used to store response from the OMDB API
    // title: '', // tied to 'title' input search field
    //responseFromOMDB: {} // object assigned based on response from OMDB
  };
  var favorites = {
    moviesArray: [] // favorite movies array
  };

  // get all favorites from our database
  function getFavoritesFromDatabase() {
    $http.get('/movies') // call to the server on the '/movies' route
      .then(function(response) {
        var favoriteMoviesIdArray = response.data; // array of objects returned from the server
        populateFavoritesArray(favoriteMoviesIdArray); // send this array to populateFavoritesArray()
    }); // end $http.get
  } // end getFavoritesFromDatabase()

  // populate array of favorite movies by getting movie objects from OMDB
  function populateFavoritesArray(moviesIdArray) {
    for (var i = 0; i < moviesIdArray.length; i++) { // for each movie in our array
      var imdbID = moviesIdArray[i].imdbID;
      getFavoriteFromOMDB(imdbID);
    }
  } // end populateFavoritesArray()

  // search OMBD via imdbID
  function getFavoriteFromOMDB(imdbID) {
    console.log('getFavoriteFromOMDB() called with imdbID:', imdbID);
    $http.get('http://www.omdbapi.com/?i=' + imdbID) // http://www.omdbapi.com/?i=tt0097576
      .then(function(response) {
        console.log('OMDB response from ID search:', response);
        var movieObj = response.data;
        if (movieObj.Error) { // alert user if no movie matches search results
          alert('Movie not found!');
        } else { // otherwise return movieObj
          favorites.moviesArray.push(movieObj);
        }
    }); // end $http.get
  } // end getFavoriteFromOMDB()

  // search OMDB for a movie by its title
  function searchOMDBByTitle(title) {
    console.log('searchOMDBByTitle:', title);
    $http.get('http://www.omdbapi.com/?t=' + title).then(function(response) {
      console.log(response);
      if (response.data.Error) { // alert user if no movie matches search results
        alert('Movie not found!');
      } else { // otherwise store response as an object property
        searchResults.responseFromOMDB = response;
      }
    }); // end $http.get
  } // end searchOmdbByTitle()

  // add movie object to database and refresh favorites.moviesArray
  function addToFavorites(movie) {
    var newMovie = isNewMovie(movie); // verify if movie has already been favorited
    if (newMovie) { // add to favorite movies if it's a new movie
      $http.post('/movies', movie).then(function(response) {
        console.log('saved movie to database:', response);
        favorites.moviesArray = []; // clear out favorites.moviesArray
        getFavoritesFromDatabase(); // get all favorites from the database
      });
    } else { // alert user if it's already been favorited
      alert('This movie is already in your list of favorites.');
    }
  } // end addToFavorites()

  function deleteFromFavorites(imdbID) {
    console.log('deleteFromFavorites() movie:', imdbID);
    $http.delete('/movies/' + imdbID).then(function(response) {
      console.log('deleted movie from database:', response);
      favorites.moviesArray = []; // clear out favorites.moviesArray
      getFavoritesFromDatabase(); // get all favorites from the database
    });
  }

  function isNewMovie(movie) {
    for (var i = 0; i < favorites.moviesArray.length; i++) {
      if (movie.imdbID === favorites.moviesArray[i].imdbID) {
        return false;
      }
    } // end for-loop
    return true;
  } // end isNewMovie()

  // public information
  return {
    favorites: favorites, // 'favorites' object reference -- 'moviesArray' property is an array of favorite movie objects
    getFavoritesFromDatabase: getFavoritesFromDatabase, // function to get favorites from the database -- no inputs
    searchResults: searchResults, // 'searchResults' object referece -- 'responseFromOMDB' property is a sub-object that holds the response object from OMDB -- responseFromOMDB.data is the actual movie object from OMDB
    searchOMDBByTitle: searchOMDBByTitle, // function search OMDB for a movie by its title -- takes title as a string input
    addToFavorites: addToFavorites, // add movie object to our database of favorites
    deleteFromFavorites: deleteFromFavorites // delete movie from database
  }; // end return
}]); // end 'MovieService'
