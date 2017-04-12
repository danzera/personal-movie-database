var pmdbApp = angular.module('pmdbApp', []);

pmdbApp.controller('InputController', ['$scope', 'MovieService', function($scope, MovieService) {
  console.log('InputController loaded');
  var search = this; // store reference to the controller as 'search'
  search.title = ''; // data-bound to user input field
  search.searchOMDB = MovieService.searchOMDB; // data-bound to user button click
  search.searchResults = MovieService.searchResults; // reference to searchResults object -- object contains the OMDB response as a property
  search.addToFavorites = MovieService.addToFavorites; // bound to 'Add to Favorites' button
  // search.searchForm = MovieService.searchForm;
  // search.getPoster = MovieService.getPoster; // bound to 'Search OMDB' button
}]); // end 'InputController'

pmdbApp.controller('OutputController', ['MovieService', function(MovieService) {
  console.log('OutputController loaded');
  var movies = this; // store reference to the controller as 'favorites'
  MovieService.getFavorites(); // call to the database to get all favorites
  movies.favorites = MovieService.favorites; // assign property of the controller to reference the factory's favorite movies object
}]); // end 'OutputController'

pmdbApp.factory('MovieService', ['$http', function($http) {
  var searchResults = { // searchResults object will be used to store response from the OMDB API

  };
  var favorites = {
    moviesArray: [] // favorite movies array
  };

  // get all favorites from our database
  var getFavorites = function() {
    $http.get('/movies')
      .then(function(response) { // call to the server on the '/movies' route
        var favoriteMoviesIdArray = response.data; // array of objects returned from the server
        console.log('favoriteMoviesIdArray in getFavorites():', favoriteMoviesIdArray);
        populateFavoritesArray(favoriteMoviesIdArray); // send this array to populateFavoritesArray()
    }); // end $http.get
  }; // end getFavorites()

  // populate array of favorite movies by getting movie objects from OMDB
  var populateFavoritesArray = function(moviesIdArray) {
    console.log('moviesIdArray in populateFavoritesArray:', moviesIdArray);
    // var movieObjArray = [];

    // ANGULAR -- angular.forEach
    // var values = {name: 'misko', gender: 'male'};
    // var log = [];
    // angular.forEach(values, function(value, key) {
    //   this.push(key + ': ' + value);
    // }, log);
    // expect(log).toEqual(['name: misko', 'gender: male']);
    // angular.forEach(moviesIdArray, function(value, key) {
    //   var imdbID = value.imdbID;
    //   var movieObj = searchOMDBbyID(imdbID);
    //   console.log('movieObj:', movieObj);
    //   this.push(movieObj);
    // }, movieObjArray);
    // console.log('movieObjArray:', movieObjArray);

    for (var i = 0; i < moviesIdArray.length; i++) { // for each movie in our array
      var imdbID = moviesIdArray[i].imdbID;
      console.log('favorite movie:', moviesIdArray[i].title + ', imdbID:', imdbID);
      searchOMDBbyID(imdbID);
    }
    // console.log('movieObjArray:', movieObjArray);
    // favorites.moviesArray = movieObjArray;
    // console.log('favorites.moviesArray:', favorites.moviesArray);
  };

  // search OMBD via imdbID
  var searchOMDBbyID = function(imdbID) {
    console.log('searchOMDBbyID() called with imdbID:', imdbID);
    $http.get('http://www.omdbapi.com/?i=' + imdbID) // http://www.omdbapi.com/?i=tt0097576
      .then(function(response) {
        console.log('OMDB response from ID search:', response);
        var movieObj = response.data;
        if (movieObj.Error) { // alert user if no movie matches search results
          alert('Movie not found!');
        } else { // otherwise return movieObj
          var newMovie = true;
          for (var i = 0; i < favorites.moviesArray.length; i++) {
            console.log('we are here -- favorites.moviesArray:', favorites.moviesArray);
            if (movieObj.imdbID === favorites.moviesArray[i].imdbID) {
              newMovie = false;
              break;
            }
          } // end for-loop
          if (newMovie) favorites.moviesArray.push(movieObj);
        }
    }); // end $http.get
  }; // end searchOMDBbyID()

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
    favorites: favorites, // 'favorites' object reference -- 'moviesArray' property is an array of movie objects
    getFavorites: getFavorites, // function to get favorites from the database -- no inputs
    searchResults: searchResults, // 'searchResults' object referece -- NOT CURRENTLY used
    searchOMDBbyID: searchOMDBbyID, // function search OMDB by imdbID -- takes imdbID as an input
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
