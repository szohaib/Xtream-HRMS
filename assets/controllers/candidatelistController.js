(function () {
    "use strict";
    //var app= angular.module('mainApp', ["ngRoute"]);
    app.controller('mainController', function($scope, $http, $location, $rootScope, AuthenticationService){

        console.log($rootScope.globals);
        $scope.current = $rootScope.globals.currentUser.username;

    });
}());