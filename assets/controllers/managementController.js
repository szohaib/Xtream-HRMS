(function () {
    "use strict";
    //var app= angular.module('mainApp', ["ngRoute"]);
    app.controller('managementController', function($scope, $http, $location, $rootScope, AuthenticationService,navbarCheck){
        //$scope.showPageHero = navbarCheck.checkPage($location.path());
        $scope.$on('$routeChangeSuccess', function () {

            $scope.$root.file = 'navbar.html';
        });

        console.log($rootScope.globals);
        $scope.current = $rootScope.globals.currentUser.username;

        $http({
            method : "GET",
            url : "http://202.153.46.138:82/api/Resume/details"
        }).then(function mySuccess(response) {
            $scope.inPool = response.data.length;
            //console.log($scope.myWelcome.length);
        }, function myError(response) {
            $scope.inPool = "Error";
        });
    });
}());