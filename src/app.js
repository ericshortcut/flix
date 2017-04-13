const app = require('./routes.js');
const css = require('./scss/app.scss');

app.controller('myCtrl', ( $scope, $rootScope ) => {

    $scope.helloWorld = "Hello world";

    $rootScope.$on('path:change', function (event, path) {
      $scope.index = '';
      $scope.favorites = '';
      switch(path){
         case "/" : $scope.index = 'active'; break
         case "/favorites" : $scope.favorites = 'active'; break
         default: $scope.notFound = 'active'; break
      }

    });

})
.controller('formCtrl', ( $scope, $http, localStorageService, $rootScope, $location ) => {
    $rootScope.$emit('path:change', $location.path());
    $scope.search = ( movie ) => {

        $scope.resultEmpty = true;
        $scope.movies = [];
        $scope.moviesError = "Searching ...";

        $http
          .get("https://omdbapi.com/?s="+movie)
          .then(function(response) {
              if(response.data.Response !== "False"){
                  $scope.movies = response.data.Search;
                  $scope.resultEmpty = false;
              }
          }, function(e){
              $scope.moviesError = response.data.Error
          });
    };

    $scope.toggleFavorites = ( movie ) => {
      if( localStorageService.get( movie.imdbID ) )
      {
        localStorageService.remove(movie.imdbID);
        console.log("remove");
      }else{
        console.log("ad");
        localStorageService.set(movie.imdbID, movie);
      }
      console.log(localStorageService.keys());
    };

})
.controller('favoritesCtrl', ( $scope, localStorageService, $rootScope, $location ) => {
    $scope.movies = [];
    $rootScope.$emit('path:change', $location.path()); // $rootScope.$on
    let updateMovies = (() =>{
        console.log("update");
        $scope.movies = localStorageService
                       .keys()
                       .map( (movie) =>{
                          return localStorageService.get(movie);
                       });
    });

    updateMovies();
    
    $scope.toggleFavorites = ( movie ) => {
      if( localStorageService.get( movie.imdbID ) )
      {
        localStorageService.remove(movie.imdbID);
        console.log("remove");
      }else{
        console.log("ad");
        localStorageService.set(movie.imdbID, movie);
      }
      updateMovies();
      console.log(localStorageService.keys());
    };


});
