module.exports =  (()=>{

const app = angular.module("myApp", ["ngRoute","LocalStorageModule"]);

    app.config(($routeProvider,localStorageServiceProvider)=> {

        $routeProvider
        .when("/", {
            templateUrl : "/main.htm"
        })
        .when("/favorites", {
            templateUrl : "/favorites.htm"
        })
        .otherwise({ redirectTo: '/' })
        
        localStorageServiceProvider.setPrefix('flix');

    })



    return app;

})();
