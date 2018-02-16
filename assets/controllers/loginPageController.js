(function () {
    "use strict";
    //var app= angular.module('mainApp', []);
    app.controller('loginController', function ($scope , $http, $location, $rootScope, AuthenticationService) {

        $scope.$root.file = '';
        //var vm = this;
        // reset login status
        AuthenticationService.ClearCredentials();
        $scope.login = function () {
            $scope.dataLoading = true;
            AuthenticationService.Login($scope.username, $scope.password, function(response) {

                if(response.status == 200) {
                    AuthenticationService.SetCredentials($scope.username, $scope.password);
                    $scope.$root.file = 'navbar.html';
                    $location.path('/recruitmentmanagement');

                } 

                    
                
            });


        };
        
        $rootScope.$on("loginError" ,function(){
            
            $scope.dataLoading = false;
            $scope.error123 = "Invalid username or password";
        }

        );
    });

}());