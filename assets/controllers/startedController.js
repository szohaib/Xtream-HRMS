(function () {
    "use strict";
    //var app= angular.module('mainApp', {"ngRoute"]);
    app.controller('startedController', function($scope, $http, $location, $rootScope,$route, AuthenticationService){

        console.log($rootScope.globals);
        $scope.current = $rootScope.globals.currentUser.username;

    });
    
}());