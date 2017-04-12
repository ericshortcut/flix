module.exports =  (()=>{

const app = angular.module("myApp", ["ngRoute"]);

    app.config(($routeProvider)=> {

        $routeProvider
        .when("/", {
            templateUrl : "/main.htm"
        })
        .when("/one", {
            templateUrl : "/one.htm"
        })
        .when("/two", {
            templateUrl : "/two.htm"
        })
        .otherwise({ redirectTo: '/' })
       
    })
    
    return app;

})();