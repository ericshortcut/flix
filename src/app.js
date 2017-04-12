const app = require('./routes.js');
const css = require('./scss/app.scss');

app.controller('myCtrl', ($scope) => {

    $scope.helloWorld = "Hello world";

});