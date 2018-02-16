(function () {
    "use strict";
    //var app= angular.module('mainApp', {"ngRoute"]);
    app.controller('onholdController', function($scope, $http, $location, $rootScope,$route, AuthenticationService){
        $scope.isActive = function (viewLocation) { 
            return viewLocation === $location.path();
        };
        console.log($rootScope.globals);
        $scope.current = $rootScope.globals.currentUser.username;
    });
    
}());