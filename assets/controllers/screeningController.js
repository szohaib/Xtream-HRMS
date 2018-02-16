(function () {
    "use strict";
    //var app= angular.module('mainApp', {"ngRoute"]);
    app.controller('screeningController', function($scope, $http, $location, $rootScope,$route, AuthenticationService){

        console.log($rootScope.globals);
        $scope.current = $rootScope.globals.currentUser.username;

        $scope.submitScreen = function(){
            var temp = document.getElementById('shortlistData').value;
            $scope.screenData = {
                "Candidate_Name": document.getElementById('name').value,
                "Phone": Number(document.getElementById('phone123').value),
                "Email_Id": document.getElementById('email').value,
                "Interview_Dt": $scope.date123,
                "Interview_Time": $scope.time,
                "Round1": $scope.r1,
                "Round1Type": $scope.r1t,
                "Round1_Comments": null,
                "Round2": $scope.r2,
                "Round2Type": $scope.r2t,
                "Round2_Comments": null,
                "Round3": $scope.r3,
                "Round3Type": $scope.r3t,
                "Round3_Comments": null,
                "Final_Status_Id": null,
                "Status_Reason": null,
                "Modified_By": 1,
                "Modified_DT": "2018-01-04T15:15:42.68",
                "skill": temp
            };
            $http({
                'method': 'POST',
                'url': 'http://202.153.46.138:82/api/Job/postScreening',
                'headers': {
                  'Content-Type': 'application/json',
                },
                'data': $scope.screenData
              }).then(
                  function(response){
                    alert("Success!");
                    $route.reload();
            });
            console.log($scope.screenData);
        };
    });
    
}());




