const app = require('./routes.js');
const css = require('./scss/app.scss');

app.controller('myCtrl', ( $scope ) => {

    $scope.helloWorld = "Hello world";

})
.controller('formCtrl', ( $scope, $http, localStorageService ) => {

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

});
