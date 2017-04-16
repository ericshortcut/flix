const app = require('./routes.js');
const css = require('./scss/app.scss');

app
.factory('MovieUtil', function() {

    const id = (a) => { return a; };

    const _yearInt = (a) => { 
      a.Year = Number.parseInt(a.Year);
      return a; 
    };

    const ano = (a,b) => { 
      a = _yearInt(a);
      b = _yearInt(b);

      if( a.Year < b.Year )
        return -1;
      if( a.Year > b.Year )
        return 1;
      return 0;
    };

    var filterSelected = function(a){
        var opt = { 
          "" : _yearInt , // TODO: Filter by empty
          "votos": _yearInt, // TODO: Filter by Votos
          "categoria": _yearInt, // TODO: Filter by category
          "ano": ano
        };
        return opt[a];
    };

    return {
      filter : filterSelected
    };
})
.controller('mainCtrl', ( $scope, $rootScope ) => {

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
.controller('formCtrl',( $scope, $http, localStorageService, $rootScope, $location, MovieUtil ) => {
    $rootScope.$emit('path:change', $location.path());
    $scope.search = ( movie, filter ) => {
        

        $scope.resultEmpty = true;
        $scope.movies = [];
        $scope.moviesError = "Searching ...";

        $http
        .get("https://omdbapi.com/?s="+movie)
        .then(function(response) {
            if(response.data.Response !== "False"){
                $scope.movies = response.data.Search.sort( MovieUtil.filter(filter) );
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
.controller('favoritesCtrl', ( $scope, localStorageService, $rootScope, $location, MovieUtil ) => {
    $scope.movies = [];
    $scope.filter = "";
    $rootScope.$emit('path:change', $location.path()); // $rootScope.$on

    let updateMovies = (() =>{
        let filter = MovieUtil.filter($scope.filter);
        console.log("update",filter);
        $scope.movies = localStorageService
                       .keys()
                       .map( (movie) =>{
                          return localStorageService.get(movie);
                       })
                       .sort(filter);
    });

    updateMovies();

    $scope.applyFilter = function(){
      updateMovies();
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
      updateMovies();
      console.log(localStorageService.keys());
    };


});
