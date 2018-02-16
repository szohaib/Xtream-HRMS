(function () {
    "use strict";
    //var app= angular.module('mainApp', []);
    app.controller('navbarController', function ($scope , $http, $location, $rootScope, AuthenticationService,navbarCheck) {
        if($location.path() == '/')
        {
            $scope.$root.file = '';
        }
        else
        {
            $scope.$root.file= 'navbar.html';    
        }
        $scope.isActive = function (viewLocation) { 
            return viewLocation === $location.path();
        };
        $scope.logout = function()
        {
            
                AuthenticationService.ClearCredentials();
                $location.path('/');
                toastr.options.closeButton = true;
                toastr.options.timeOut = 1300;
                toastr.success('You have been logged out successfully');
                $scope.$root.file  = '';
            
        };
    });

}());